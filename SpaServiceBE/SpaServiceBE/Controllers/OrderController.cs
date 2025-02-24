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

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
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
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateOrder([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string customerId = jsonElement.GetProperty("customerId").GetString();
                DateTime orderDate = jsonElement.GetProperty("orderDate").GetDateTime();
                float totalAmount = jsonElement.GetProperty("totalAmount").GetSingle();
               
                string transactionId = jsonElement.GetProperty("transactionId").GetString();

                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(transactionId) || totalAmount <=0)
                {
                    return BadRequest(new { msg = "Order details are incomplete or invalid." });
                }

                var order = new Order
                {
                    OrderId = Guid.NewGuid().ToString("N"),
                    CustomerId = customerId,
                    OrderDate = orderDate,
                    TotalAmount = totalAmount,
                    Status = true,
                    TransactionId = transactionId
                };

                await _orderService.AddOrderAsync(order);
                return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, order);
            }
            catch (Exception ex)
            {
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

                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(transactionId) || totalAmount<=0)
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

    }
}
