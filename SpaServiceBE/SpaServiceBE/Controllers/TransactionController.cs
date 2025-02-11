using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _service;

        public TransactionController(ITransactionService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/transactions/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetAllTransactions()
        {
            try
            {
                var transactions = await _service.GetAll();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/transactions/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("TransactionId is required.");

            try
            {
                var transaction = await _service.GetById(id);

                if (transaction == null)
                    return NotFound($"Transaction with ID = {id} not found.");

                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/transactions/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateTransaction([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string transactionType = jsonElement.GetProperty("transactionType").GetString();
                float totalPrice = jsonElement.GetProperty("totalPrice").GetSingle();
                bool status = jsonElement.GetProperty("status").GetBoolean();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(transactionType) || totalPrice <= 0 || status != null)
                {
                    return BadRequest(new { msg = "Transaction details are incomplete or invalid." });
                }

                // Tạo đối tượng Transaction
                var transaction = new Transaction
                {
                    TransactionId = Guid.NewGuid().ToString(), // Generate unique ID
                    TransactionType = transactionType,
                    TotalPrice = totalPrice,
                    Status = status
                };

                // Gọi service để thêm transaction
                var isCreated = await _service.Add(transaction);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the transaction." });

                return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.TransactionId }, transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/transactions/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateTransaction(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string transactionType = jsonElement.GetProperty("transactionType").GetString();
                float totalPrice = jsonElement.GetProperty("totalPrice").GetSingle();
                bool status = jsonElement.GetProperty("status").GetBoolean();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(transactionType) || totalPrice <= 0 || status != null)
                {
                    return BadRequest(new { msg = "Transaction details are incomplete or invalid." });
                }

                // Tạo đối tượng Transaction và gán ID cho update
                var transaction = new Transaction
                {
                    TransactionId = id, // Use the provided ID for the update
                    TransactionType = transactionType,
                    TotalPrice = totalPrice,
                    Status = status
                };

                // Gọi service để cập nhật transaction
                var isUpdated = await _service.Update(id, transaction);

                if (!isUpdated)
                    return NotFound(new { msg = $"Transaction with ID = {id} not found." });

                return Ok(new { msg = "Update transaction successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/transactions/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteTransaction(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("TransactionId is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"Transaction with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
