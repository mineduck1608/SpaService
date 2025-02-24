using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
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

        public OrderController(IOrderService orderService, ICosmeticProductService cosmeticProductService, IOrderDetailService orderDetailService, ICustomerService customerService, ICosmeticTransactionService cosmeticTransactionService, ITransactionService transactionService)
        {
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
        public async Task<ActionResult> CreateOrderWithDetails([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract and validate order-related data
                if (!jsonElement.TryGetProperty("customerId", out var customerIdProp) ||
                    !jsonElement.TryGetProperty("orderDate", out var orderDateProp) ||
                    !jsonElement.TryGetProperty("productId", out var productIdProp) ||
                    !jsonElement.TryGetProperty("quantity", out var quantityProp) ||
                    !jsonElement.TryGetProperty("transactionType", out var transactionTypeProp) ||
                    !jsonElement.TryGetProperty("paymentType", out var paymentTypeProp))
                {
                    return BadRequest(new { msg = "Missing required fields in request." });
                }

                string customerId = customerIdProp.GetString();
                string productId = productIdProp.GetString();
                DateTime orderDate = orderDateProp.GetDateTime();
                float quantity = quantityProp.GetSingle();
                string transactionType = transactionTypeProp.GetString();
                string paymentType = paymentTypeProp.GetString();

                if (string.IsNullOrWhiteSpace(customerId) || string.IsNullOrWhiteSpace(productId) || quantity <= 0 ||
                    string.IsNullOrWhiteSpace(transactionType) || string.IsNullOrWhiteSpace(paymentType))
                {
                    return BadRequest(new { msg = "Invalid or incomplete order details." });
                }

                // Fetch and validate product
                var cosmeticProduct = await _cosmeticProductService.GetCosmeticProductById(productId);
                if (cosmeticProduct == null || !cosmeticProduct.IsSelling || !cosmeticProduct.Status)
                {
                    return BadRequest(new { msg = "The product is not available." });
                }

                // Check stock availability
                if (cosmeticProduct.Quantity < (int)quantity)
                {
                    return BadRequest(new { msg = "Not enough stock available." });
                }

                // Calculate subtotal amount
                float subAmount = (float)(quantity * cosmeticProduct.Price);

                // Generate IDs first
                string orderId = Guid.NewGuid().ToString("N");
                string transactionId = Guid.NewGuid().ToString();
                string cosmeticTransactionId = Guid.NewGuid().ToString();

                // Create Transaction first
                var transaction = new Transaction
                {
                    TransactionId = transactionId,
                    TransactionType = transactionType,
                    TotalPrice = subAmount,
                    Status = true,
                    PaymentType = paymentType
                };
                await _transactionService.Add(transaction);

                // Create CosmeticTransaction before Order due to the foreign key constraint
                var cosmeticTransaction = new CosmeticTransaction
                {
                    CosmeticTransactionId = cosmeticTransactionId,
                    TransactionId = transactionId,
                    OrderId = orderId  // We can set this because we pre-generated the orderId
                };
                await _cosmeticTransactionService.CreateAsync(cosmeticTransaction);

                // Now create Order
                var order = new Order
                {
                    OrderId = orderId,
                    CustomerId = customerId,
                    OrderDate = orderDate,
                    TotalAmount = subAmount,
                    Status = true,
                    TransactionId = cosmeticTransactionId
                };
                await _orderService.AddOrderAsync(order);

                // Create OrderDetail
                var orderDetail = new OrderDetail
                {
                    OrderId = orderId,
                    ProductId = productId,
                    Quantity = quantity,
                    SubtotalAmount = subAmount
                };
                await _orderDetailService.Create(orderDetail);

                // Update product stock last
                cosmeticProduct.Quantity -= (int)quantity;
                await _cosmeticProductService.Update(cosmeticProduct);

                return CreatedAtAction(nameof(GetOrderById), new { id = orderId }, new
                {
                    order,
                    orderDetail,
                    transaction,
                    cosmeticTransaction
                });
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
                    TransactionId = transactionId
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
