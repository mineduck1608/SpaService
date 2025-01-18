using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/schedules")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _service;

        public ScheduleController(IScheduleService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/schedules/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetAllSchedules()
        {
            try
            {
                var schedules = await _service.GetAll();
                return Ok(schedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/schedules/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Schedule>> GetScheduleById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ScheduleId is required.");

            try
            {
                var schedule = await _service.GetById(id);

                if (schedule == null)
                    return NotFound($"Schedule with ID = {id} not found.");

                return Ok(schedule);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/schedules/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateSchedule([FromBody] Schedule schedule)
        {
            if (schedule == null ||
                string.IsNullOrEmpty(schedule.EmployeeId) ||
                schedule.StartTime == default(DateTime) ||
                schedule.EndTime == default(DateTime) ||
                string.IsNullOrEmpty(schedule.Status))
            {
                return BadRequest("Schedule details are incomplete or invalid.");
            }

            schedule.ScheduleId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.Add(schedule);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the schedule.");

                return CreatedAtAction(nameof(GetScheduleById), new { id = schedule.ScheduleId }, schedule);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/schedules/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateSchedule(string id, [FromBody] Schedule schedule)
        {
            if (schedule == null ||
                string.IsNullOrEmpty(schedule.EmployeeId) ||
                schedule.StartTime == default(DateTime) ||
                schedule.EndTime == default(DateTime) ||
                string.IsNullOrEmpty(schedule.Status))
            {
                return BadRequest("Schedule details are incomplete or invalid.");
            }

            schedule.ScheduleId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.Update(id, schedule);

                if (!isUpdated)
                    return NotFound($"Schedule with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/schedules/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteSchedule(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ScheduleId is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"Schedule with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
