using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/workingSchedules")]
    [ApiController]
    public class WorkingScheduleController : ControllerBase
    {
        private readonly IWorkingScheduleService _workingScheduleService;

        public WorkingScheduleController(IWorkingScheduleService workingScheduleService)
        {
            _workingScheduleService = workingScheduleService ?? throw new ArgumentNullException(nameof(workingScheduleService));
        }

        // GET: api/workingSchedules
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkingSchedule>>> GetAllWorkingSchedules()
        {
            try
            {
                var workingSchedules = await _workingScheduleService.GetAllWorkingSchedules();
                return Ok(workingSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/workingSchedules/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<WorkingSchedule>> GetWorkingScheduleById(string id)
        {
            try
            {
                var workingSchedule = await _workingScheduleService.GetWorkingScheduleById(id);

                if (workingSchedule == null)
                    return NotFound($"WorkingSchedule with ID = {id} not found.");

                return Ok(workingSchedule);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/workingSchedules/Create
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateWorkingSchedule([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string dateString = jsonElement.GetProperty("date").GetString();
                DateTime? checkInTime = jsonElement.GetProperty("checkInTime").GetDateTime();
                DateTime? checkOutTime = jsonElement.GetProperty("checkOutTime").GetDateTime();
                string status = jsonElement.GetProperty("status").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                string shiftId = jsonElement.GetProperty("shiftId").GetString();

                DateOnly date;
                if (!DateOnly.TryParse(dateString, out date))
                {
                    return BadRequest(new { msg = "Invalid duration format." });
                }

                if (string.IsNullOrEmpty(status) || string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(shiftId))
                    return BadRequest("Working schedule details are incomplete.");

                var workingSchedule = new WorkingSchedule
                {
                    WorkingScheduleId = Guid.NewGuid().ToString("N"),
                    Date = date,
                    CheckInTime = checkInTime,
                    CheckOutTime = checkOutTime,
                    Status = status,
                    EmployeeId = employeeId,
                    ShiftId = shiftId
                };

                var isCreated = await _workingScheduleService.AddWorkingSchedule(workingSchedule);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the working schedule.");

                return Ok("Create working schedule successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/workingSchedules/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateWorkingSchedule(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string dateString = jsonElement.GetProperty("date").GetString();
                DateTime? checkInTime = jsonElement.GetProperty("checkInTime").GetDateTime();
                DateTime? checkOutTime = jsonElement.GetProperty("checkOutTime").GetDateTime();
                string status = jsonElement.GetProperty("status").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                string shiftId = jsonElement.GetProperty("shiftId").GetString();

                DateOnly date;
                if (!DateOnly.TryParse(dateString, out date))
                {
                    return BadRequest(new { msg = "Invalid duration format." });
                }

                if (string.IsNullOrEmpty(status) || string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(shiftId))
                    return BadRequest("Working schedule details are incomplete.");

                var workingSchedule = new WorkingSchedule
                {
                    WorkingScheduleId = id,
                    Date = date,
                    CheckInTime = checkInTime,
                    CheckOutTime = checkOutTime,
                    Status = status,
                    EmployeeId = employeeId,
                    ShiftId = shiftId
                };

                var isUpdated = await _workingScheduleService.UpdateWorkingSchedule(workingSchedule, id);

                if (!isUpdated)
                    return NotFound($"WorkingSchedule with ID = {id} not found.");

                return Ok("Update working schedule successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/workingSchedules/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteWorkingSchedule(string id)
        {
            try
            {
                var isDeleted = await _workingScheduleService.DeleteWorkingSchedule(id);

                if (!isDeleted)
                    return NotFound($"WorkingSchedule with ID = {id} not found.");

                return Ok("Delete working schedule successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
