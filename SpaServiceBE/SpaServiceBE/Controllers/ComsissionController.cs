using Microsoft.AspNetCore.Authorization;
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
    [Route("api/commissions")]
    [ApiController]
    public class CommissionController : ControllerBase
    {
        private readonly IComissionService _service;

        public CommissionController(IComissionService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/commissions/GetAll
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Commission>>> GetAllCommissions()
        {
            try
            {
                var commissions = await _service.GetAllCommissions();
                return Ok(commissions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/commissions/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Commission>> GetCommissionById(string id)
        {
            try
            {
                var commission = await _service.GetCommissionById(id);

                if (commission == null)
                    return NotFound($"Commission with ID = {id} not found.");

                return Ok(commission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/commissions/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCommission([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                int percentage = jsonElement.GetProperty("percentage").GetInt32();

                // Validate input
                if (percentage <= 0)
                {
                    return BadRequest(new { msg = "Commission details are incomplete or invalid." });
                }

                // Create Commission object
                var commission = new Commission
                {
                    CommissionId = Guid.NewGuid().ToString(), // Generate unique ID
                    Percentage = percentage
                };

                // Call service to add commission
                var isCreated = await _service.AddCommission(commission);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the commission." });

                return CreatedAtAction(nameof(GetCommissionById), new { id = commission.CommissionId }, commission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/commissions/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCommission(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                int percentage = jsonElement.GetProperty("percentage").GetInt32();

                // Validate input
                if (percentage <= 0)
                {
                    return BadRequest(new { msg = "Commission details are incomplete or invalid." });
                }

                // Create Commission object and assign ID for update
                var commission = new Commission
                {
                    CommissionId = id, // Use the provided ID for the update
                    Percentage = percentage
                };

                // Call service to update commission
                var isUpdated = await _service.UpdateCommission(id, commission);

                if (!isUpdated)
                    return NotFound(new { msg = $"Commission with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/commissions/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCommission(string id)
        {
            try
            {
                var isDeleted = await _service.DeleteCommission(id);

                if (!isDeleted)
                    return NotFound($"Commission with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
