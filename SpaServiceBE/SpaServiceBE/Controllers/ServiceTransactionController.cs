using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/servicetransactions")]
    [ApiController]
    public class ServiceTransactionController : ControllerBase
    {
        private readonly IServiceTransactionService _serviceTransactionService;

        public ServiceTransactionController(IServiceTransactionService serviceTransactionService)
        {
            _serviceTransactionService = serviceTransactionService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ServiceTransaction>>> GetAll()
        {
            return Ok(await _serviceTransactionService.GetAll());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<ServiceTransaction>> GetServiceTransactionById(string id)
        {
            return Ok(await _serviceTransactionService.GetByTransId(id));
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

                await _serviceTransactionService.Add(serviceTransaction);

                return CreatedAtAction(nameof(GetServiceTransactionById), new { id = serviceTransaction.ServiceTransactionId }, serviceTransaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _serviceTransactionService.Delete(id);
            return NoContent();
        }
    }
}
