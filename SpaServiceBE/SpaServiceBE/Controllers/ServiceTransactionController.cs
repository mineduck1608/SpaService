using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTransactionController : ControllerBase
    {
        private readonly IServiceTransactionService _serviceTransactionService;

        public ServiceTransactionController(IServiceTransactionService serviceTransactionService)
        {
            _serviceTransactionService = serviceTransactionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceTransaction>>> GetAll()
        {
            return Ok(await _serviceTransactionService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceTransaction>> GetById(string id)
        {
            return Ok(await _serviceTransactionService.GetByIdAsync(id));
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateServiceTransaction([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string transactionId = jsonElement.GetProperty("transactionId").GetString();
                string requestId = jsonElement.GetProperty("requestId").GetString();
                string? membershipId = jsonElement.TryGetProperty("membershipId", out var membershipElement) ? membershipElement.GetString() : null;

                if (string.IsNullOrEmpty(transactionId) || string.IsNullOrEmpty(requestId))
                {
                    return BadRequest(new { msg = "ServiceTransaction details are incomplete or invalid." });
                }

                var serviceTransaction = new ServiceTransaction
                {
                    ServiceTransactionId = Guid.NewGuid().ToString("N"),
                    TransactionId = transactionId,
                    RequestId = requestId,
                    MembershipId = membershipId
                };

                await _serviceTransactionService.CreateAsync(serviceTransaction);

                return CreatedAtAction(nameof(GetById), new { id = serviceTransaction.ServiceTransactionId }, serviceTransaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateServiceTransaction(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string transactionId = jsonElement.GetProperty("transactionId").GetString();
                string requestId = jsonElement.GetProperty("requestId").GetString();
                string? membershipId = jsonElement.TryGetProperty("membershipId", out var membershipElement) ? membershipElement.GetString() : null;

                if (string.IsNullOrEmpty(transactionId) || string.IsNullOrEmpty(requestId))
                {
                    return BadRequest(new { msg = "ServiceTransaction details are incomplete or invalid." });
                }

                var serviceTransaction = new ServiceTransaction
                {
                    ServiceTransactionId = id,
                    TransactionId = transactionId,
                    RequestId = requestId,
                    MembershipId = membershipId
                };

                var isUpdated = await _serviceTransactionService.UpdateAsync(id, serviceTransaction);

                if (!isUpdated)
                    return NotFound(new { msg = $"ServiceTransaction with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _serviceTransactionService.DeleteAsync(id);
            return NoContent();
        }
    }
}
