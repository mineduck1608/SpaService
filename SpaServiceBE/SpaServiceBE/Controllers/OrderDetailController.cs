using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/orderdetails")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailService _service;

        public OrderDetailController(IOrderDetailService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail>> GetById(int id)
        {
            var item = await _service.GetById(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateOrderDetail([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                float quantity = jsonElement.GetProperty("quantity").GetSingle();
                float subtotalAmount = jsonElement.GetProperty("subtotalAmount").GetSingle();
                string orderId = jsonElement.GetProperty("orderId").GetString();
                string productId = jsonElement.GetProperty("productId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(orderId) || string.IsNullOrEmpty(productId))
                {
                    return BadRequest(new { msg = "Order detail information is incomplete or invalid." });
                }

                // Create OrderDetail object
                var orderDetail = new OrderDetail
                {
                    OrderDetailId = new Random().Next(1, int.MaxValue), // Generate unique ID
                    Quantity = quantity,
                    SubtotalAmount = subtotalAmount,
                    OrderId = orderId,
                    ProductId = productId
                };

                await _service.Create(orderDetail);
                return CreatedAtAction(nameof(GetById), new { id = orderDetail.OrderDetailId }, orderDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateOrderDetail(int id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                float quantity = jsonElement.GetProperty("quantity").GetSingle();
                float subtotalAmount = jsonElement.GetProperty("subtotalAmount").GetSingle();

                // Validate input
                if (quantity <= 0 || subtotalAmount <= 0)
                {
                    return BadRequest(new { msg = "Order detail information is incomplete or invalid." });
                }

                // Create OrderDetail object with updated values
                var orderDetail = new OrderDetail
                {
                    OrderDetailId = id,
                    Quantity = quantity,
                    SubtotalAmount = subtotalAmount
                };

                await _service.Update(orderDetail);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
