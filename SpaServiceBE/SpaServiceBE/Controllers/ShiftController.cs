using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/shifts")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private readonly IShiftService _shiftService;

        public ShiftController(IShiftService shiftService)
        {
            _shiftService = shiftService ?? throw new ArgumentNullException(nameof(shiftService));
        }

        // GET: api/shifts
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shift>>> GetAllShifts()
        {
            try
            {
                var shifts = await _shiftService.GetAllShifts();
                return Ok(shifts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/shifts/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Shift>> GetShiftById(string id)
        {
            try
            {
                var shift = await _shiftService.GetShiftById(id);

                if (shift == null)
                    return NotFound($"Shift with ID = {id} not found.");

                return Ok(shift);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/shifts/Create
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateShift([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string shiftName = jsonElement.GetProperty("shiftName").GetString();
                DateTime startTime = jsonElement.GetProperty("startTime").GetDateTime();
                DateTime endTime = jsonElement.GetProperty("endTime").GetDateTime();

                if (string.IsNullOrEmpty(shiftName))
                    return BadRequest("Shift details are incomplete.");

                // Create Shift
                var shift = new Shift
                {
                    ShiftId = Guid.NewGuid().ToString("N"),
                    ShiftName = shiftName,
                    StartTime = startTime,
                    EndTime = endTime,
                    Status = true // default status can be active
                };

                var isCreated = await _shiftService.AddShift(shift);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the shift.");

                return Ok("Create shift successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/shifts/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateShift(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string shiftName = jsonElement.GetProperty("shiftName").GetString();
                DateTime startTime = jsonElement.GetProperty("startTime").GetDateTime();
                DateTime endTime = jsonElement.GetProperty("endTime").GetDateTime();

                if (string.IsNullOrEmpty(shiftName))
                    return BadRequest("Shift details are incomplete.");

                var shift = new Shift
                {
                    ShiftId = id,
                    ShiftName = shiftName,
                    StartTime = startTime,
                    EndTime = endTime,
                    Status = true // default status
                };

                var isUpdated = await _shiftService.UpdateShift(shift, id);

                if (!isUpdated)
                    return NotFound($"Shift with ID = {id} not found.");

                return Ok("Update shift successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/shifts/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteShift(string id)
        {
            try
            {
                var isDeleted = await _shiftService.DeleteShift(id);

                if (!isDeleted)
                    return NotFound($"Shift with ID = {id} not found.");

                return Ok("Delete shift successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
