using MailKit.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Net.WebSockets;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/orderdetails")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailService _service;
        private readonly ICosmeticProductService _productService;
        private readonly IOrderService _orderService;
        public OrderDetailController(IOrderDetailService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetAllOrderDetails()
        {
            return Ok(await _service.GetAllOrderDetails());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<OrderDetail>> GetOrderDetailById(int id)
        {
            var item = await _service.GetOrderDetailById(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateOrderDetail([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
               int quantity = jsonElement.GetProperty("quantity").GetInt32();
                float subtotalAmount = jsonElement.GetProperty("subtotalAmount").GetSingle();
                string orderId = jsonElement.GetProperty("orderId").GetString();
                string productId = jsonElement.GetProperty("productId").GetString();
                //get cosmeticProduct

                var cosmeticProduct = await _productService.GetCosmeticProductById(productId);
                if (cosmeticProduct.IsSelling == false || cosmeticProduct.Status == false)
                {
                    return BadRequest(new { msg = "The product is not avaliable" });
                }
                // Validate input

                if (quantity <= 0 || string.IsNullOrEmpty(orderId) || string.IsNullOrEmpty(productId))
                {
                    return BadRequest(new { msg = "Order detail information is incomplete or invalid." });
                }
                if (cosmeticProduct.Quantity - (int)quantity < 0)
                {
                    return BadRequest(new { msg = "Not enough stocks" });
                }
                float subAmount = (float)(cosmeticProduct.Quantity * cosmeticProduct.Price);
                // Create OrderDetail object

                var orderDetail = new OrderDetail
                {
                    OrderDetailId = Guid.NewGuid().ToString("N"),
                    Quantity = quantity,
                    SubTotalAmount = subtotalAmount,
                    OrderId = orderId,
                    ProductId = productId
                };

                await _service.Create(orderDetail);
                //update Product after order created (reduce the quantity)

                cosmeticProduct.Quantity -= (int)quantity;
                await _productService.Update(cosmeticProduct);
                //get order to update total amount

                var order = await _orderService.GetOrderByIdAsync(orderId);
                if (order != null)
                {
                    order.TotalAmount += subAmount;
                    //update order total amount
                    await _orderService.UpdateOrderAsync(orderId, order);
                }
                return CreatedAtAction(nameof(GetOrderDetailById), new { id = orderDetail.OrderDetailId }, orderDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateOrderDetail(int id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                int quantity = jsonElement.GetProperty("quantity").GetInt32();
                float subtotalAmount = jsonElement.GetProperty("subtotalAmount").GetSingle();
                string orderId = jsonElement.GetProperty("orderId").GetString();
                string productId = jsonElement.GetProperty("productId").GetString();

                // Validate input
                if (quantity <= 0 || subtotalAmount <= 0 || string.IsNullOrEmpty(orderId) || string.IsNullOrEmpty(productId))
                {
                    return BadRequest(new { msg = "Order detail information is incomplete or invalid." });
                }

                // Create OrderDetail object with updated values
                var orderDetail = new OrderDetail
                {
                    OrderDetailId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    Quantity = quantity,
                    SubTotalAmount = subtotalAmount,
                    OrderId = orderId,
                    ProductId = productId
                };

                await _service.Update(orderDetail);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }

        [HttpGet("GetOrderDetailByOrderId/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetailsByOrderId(string orderId)
        {
            try
            {
                // Fetch order details for the provided orderId
                var orderDetails = await _service.GetOrderDetailsByOrderId(orderId);

                if (orderDetails == null || !orderDetails.Any())
                {
                    return NotFound(new { msg = "No order details found for this orderId." });
                }

                return Ok(orderDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        // Other existing methods...
    }
}

