using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Repositories.Entities.RequestModel;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ICosmeticProductService _cosmeticProductService;
        private readonly IOrderDetailService _orderDetailService;
        private readonly ICustomerService _customerService;
        private readonly ICosmeticTransactionService _cosmeticTransactionService;
        private readonly ITransactionService _transactionService;
        private readonly IPromotionService _promotionService;
        public OrderController(IOrderService orderService, ICosmeticProductService cosmeticProductService, IOrderDetailService orderDetailService, ICustomerService customerService, ICosmeticTransactionService cosmeticTransactionService, ITransactionService transactionService, IPromotionService promotionService)
        {
            _cosmeticProductService = cosmeticProductService;
            _orderService = orderService;
            _cosmeticProductService = cosmeticProductService;
            _orderDetailService = orderDetailService;
            _customerService = customerService;
            _cosmeticTransactionService = cosmeticTransactionService;
            _transactionService = transactionService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllOrders()
        {
            return Ok(await _orderService.GetAllOrdersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetOrderById(string id)
        {
            return Ok(await _orderService.GetOrderByIdAsync(id));
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateOrderWithDetails([FromBody] OrderRequest orderRequest)
        {
            try
            {
                // Fetch and validate product
                var productIdList = orderRequest.Details.Select(x => x.ProductId).ToList();
                var products = await _cosmeticProductService.GetProductsOfList(productIdList);
                var promo = await _promotionService.GetByCode(orderRequest.PromotionCode);
                if (promo == null)
                {
                    return BadRequest(new { msg = "Promotion doesn't exist or inactive" });
                }
                if(orderRequest.Details.Count == 0)
                {
                    return BadRequest(new { msg = "Empty cart" });
                }
                if (products.Count != orderRequest.Details.Count)
                {
                    return BadRequest(new { msg = "Some products don't exist" });
                }
                // Check stock availability AND calculate price at the same time
                double total = 0;
                var detailMap = new Dictionary<string, double>();
                foreach (var product in orderRequest.Details)
                {
                    var stockItem = products[product.ProductId];
                    if(product.Quantity <= 0)
                    {
                        return BadRequest(new { msg = $"Item {stockItem.ProductName} has invalid amount" });
                    }
                    if (stockItem.Quantity < product.Quantity)
                    {
                        return BadRequest(new { msg = $"Cannot order more than stock for {stockItem.ProductName}" });
                    }
                    var subTotal = product.Quantity * stockItem.Price;
                    detailMap.Add(product.ProductId, subTotal);
                    total += subTotal;
                }
                // Generate IDs first
                string orderId = Guid.NewGuid().ToString("N");
                string transactionId = Guid.NewGuid().ToString("N");
                string cosmeticTransactionId = Guid.NewGuid().ToString("N");

                var order = new Order
                {
                    OrderId = orderId,
                    CustomerId = orderRequest.CustomerId,
                    OrderDate = orderRequest.OrderDate,
                    Status = true,
                    Address = orderRequest.Address,
                    TotalAmount = (float)total,
                    
                };
                await _orderService.AddOrderAsync(order);
                //Order details
                foreach (var product in orderRequest.Details)
                {
                    var orderDetail = new OrderDetail
                    {
                        ProductId = product.ProductId,
                        OrderDetailId = Guid.NewGuid().ToString("N"),
                        OrderId = orderId,
                        Quantity = product.Quantity,
                        SubTotalAmount = (float)detailMap[product.ProductId],
                        
                    };
                    await _orderDetailService.Create(orderDetail);
                }
                var transaction = new Transaction
                {
                    TransactionId = transactionId,
                    TransactionType = "Product",
                    PaymentType = orderRequest.PaymentType,
                    PromotionId = orderRequest.PromotionCode,
                    Status = false,
                    TotalPrice = (float)total,
                };
                await _transactionService.Add(transaction);

                // Create CosmeticTransaction before Order due to the foreign key constraint
                var cosmeticTransaction = new CosmeticTransaction
                {
                    CosmeticTransactionId = Guid.NewGuid().ToString("N"),
                    TransactionId = transactionId,
                    OrderId = orderId,
                };
                await _cosmeticTransactionService.CreateAsync(cosmeticTransaction);
                // Update product stock last
                foreach (var product in orderRequest.Details)
                {
                    var stockItem = products[product.ProductId];
                    stockItem.Quantity -= product.Quantity;
                    await _cosmeticProductService.Update(stockItem);
                }

                return Ok(new { id = orderId, total, transactionId });
            }
            catch (Exception ex)
            {
                // Log the exception details here if you have logging configured
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateOrder(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string customerId = jsonElement.GetProperty("customerId").GetString();
                DateTime orderDate = jsonElement.GetProperty("orderDate").GetDateTime();
                float totalAmount = jsonElement.GetProperty("totalAmount").GetSingle();
                bool status = jsonElement.GetProperty("status").GetBoolean();
                string transactionId = jsonElement.GetProperty("transactionId").GetString();

                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(transactionId) || totalAmount <= 0)
                {
                    return BadRequest(new { msg = "Order details are incomplete or invalid." });
                }

                var order = new Order
                {
                    OrderId = id,
                    CustomerId = customerId,
                    OrderDate = orderDate,
                    TotalAmount = totalAmount,
                    Status = status,
                };

                var isUpdated = await _orderService.UpdateOrderAsync(id, order);
                if (!isUpdated)
                    return NotFound(new { msg = $"Order with ID = {id} not found." });

                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            await _orderService.DeleteOrderAsync(id);
            return NoContent();
        }

        [Authorize]
        [HttpPut("ConfirmOrder/{orderId}")]
        public async Task<ActionResult> UpdateOrderStatus(string orderId)
        {
            try
            {
                // Fetch the order using the orderId
                var order = await _orderService.GetOrderByIdAsync(orderId);

                if (order == null)
                {
                    return NotFound(new { msg = $"Order with ID = {orderId} not found." });
                }

                // Update the order status to true
                order.Status = true;

                // Update the order in the database
                var isUpdated = await _orderService.UpdateOrderAsync(orderId, order);
                if (!isUpdated)
                {
                    return StatusCode(500, new { msg = "Failed to update the order status." });
                }

                return Ok(new { msg = "Order status updated successfully.", order });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("GetOrderByCustomerId/{id}")]
        public async Task<IActionResult> GetOrderByCustomerId(string id)
        {
            return Ok(await _orderService.GetOrderByCustomerIdAsync(id));
        }
    }
}
