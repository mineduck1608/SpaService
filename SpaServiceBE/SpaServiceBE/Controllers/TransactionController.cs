using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult> CreateTransaction([FromBody] Transaction transaction)
        {
            if (transaction == null ||
                string.IsNullOrEmpty(transaction.TransactionType) ||
                transaction.TotalPrice <= 0 ||
                string.IsNullOrEmpty(transaction.Status.ToString()))
            {
                return BadRequest("Transaction details are incomplete or invalid.");
            }

            transaction.TransactionId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.Add(transaction);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the transaction.");

                return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.TransactionId }, transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/transactions/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateTransaction(string id, [FromBody] Transaction transaction)
        {
            if (transaction == null ||
                string.IsNullOrEmpty(transaction.TransactionType) ||
                transaction.TotalPrice <= 0 ||
                string.IsNullOrEmpty(transaction.Status.ToString()))
            {
                return BadRequest("Transaction details are incomplete or invalid.");
            }

            transaction.TransactionId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.Update(id, transaction);

                if (!isUpdated)
                    return NotFound($"Transaction with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
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
