using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/cosmetictransactions")]
    [ApiController]
    public class CosmeticTransactionController : ControllerBase
    {
        private readonly ICosmeticTransactionService _cosmeticTransactionService;

        public CosmeticTransactionController(ICosmeticTransactionService cosmeticTransactionService)
        {
            _cosmeticTransactionService = cosmeticTransactionService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CosmeticTransaction>>> GetAll()
        {
            return Ok(await _cosmeticTransactionService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CosmeticTransaction>> GetById(string id)
        {
            var transaction = await _cosmeticTransactionService.GetByIdAsync(id);
            if (transaction == null) return NotFound();
            return Ok(transaction);
        }
        [HttpPost]
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
                return CreatedAtAction(nameof(GetById), new { id = transaction.CosmeticTransactionId }, transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, [FromBody] dynamic request)
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

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await _cosmeticTransactionService.DeleteAsync(id);
            return NoContent();
        }
    }

}
