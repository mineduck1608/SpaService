using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult> CreateCommission([FromBody] Commission commission)
        {
            if (commission == null || commission.Percentage <= 0)
                return BadRequest("Commission details are incomplete or invalid.");

            commission.CommissionId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.AddCommission(commission);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the commission.");

                return CreatedAtAction(nameof(GetCommissionById), new { id = commission.CommissionId }, commission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/commissions/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCommission(string id, [FromBody] Commission commission)
        {
            if (commission == null || commission.Percentage <= 0)
                return BadRequest("Commission details are incomplete or invalid.");

            commission.CommissionId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.UpdateCommission(id, commission);

                if (!isUpdated)
                    return NotFound($"Commission with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/commissions/Delete/{id}
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
