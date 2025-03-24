using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("cosmetictransactions")]
    [ApiController]
    public class CosmeticTransactionController : ControllerBase
    {
        private readonly ICosmeticTransactionService _cosmeticTransactionService;

        public CosmeticTransactionController(ICosmeticTransactionService cosmeticTransactionService)
        {
            _cosmeticTransactionService = cosmeticTransactionService;
        }
        
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CosmeticTransaction>>> GetAllCosmeticTransaction()
        {
            return Ok(await _cosmeticTransactionService.GetAllAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<CosmeticTransaction>> GetCosmeticTransactionById(string id)
        {
            var transaction = await _cosmeticTransactionService.GetCosmeticTransactionById(id);
            if (transaction == null) return NotFound();
            return Ok(transaction);
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> Create([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string transactionId = jsonElement.GetProperty("TransactionId").GetString();
                string orderId = jsonElement.GetProperty("OrderId").GetString();

                if (string.IsNullOrEmpty(transactionId) || string.IsNullOrEmpty(orderId))
                    return BadRequest("Transaction details are incomplete.");

                var transaction = new CosmeticTransaction
                {
                    CosmeticTransactionId = Guid.NewGuid().ToString("N"),
                    TransactionId = transactionId,
                    OrderId = orderId
                };

                await _cosmeticTransactionService.CreateAsync(transaction);
                return CreatedAtAction(nameof(GetCosmeticTransactionById), new { id = transaction.CosmeticTransactionId }, new { transactionId = transaction.CosmeticTransactionId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCosmeticTransaction(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string transactionId = jsonElement.GetProperty("TransactionId").GetString();
                string orderId = jsonElement.GetProperty("OrderId").GetString();

                if (string.IsNullOrEmpty(transactionId) || string.IsNullOrEmpty(orderId))
                    return BadRequest("Transaction details are incomplete.");

                var transaction = new CosmeticTransaction
                {
                    CosmeticTransactionId = id,
                    TransactionId = transactionId,
                    OrderId = orderId
                };

                await _cosmeticTransactionService.UpdateAsync(transaction);
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCosmeticTransaction(string id)
        {
            await _cosmeticTransactionService.DeleteAsync(id);
            return NoContent();
        }
    }

}
