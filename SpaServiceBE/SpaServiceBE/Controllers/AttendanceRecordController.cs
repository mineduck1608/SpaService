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
    [Route("api/attendancerecords")]
    [ApiController]
    public class AttendanceRecordController : ControllerBase
    {
        private readonly IAttendanceRecordService _attendanceRecordService;

        public AttendanceRecordController(IAttendanceRecordService attendanceRecordService)
        {
            _attendanceRecordService = attendanceRecordService ?? throw new ArgumentNullException(nameof(attendanceRecordService));
        }

        // GET: api/attendanceRecords
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<AttendanceRecord>>> GetAllAttendanceRecords()
        {
            try
            {
                var attendanceRecords = await _attendanceRecordService.GetAllAttendanceRecords();
                return Ok(attendanceRecords);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/attendanceRecords/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<AttendanceRecord>> GetAttendanceRecordById(string id)
        {
            try
            {
                var attendanceRecord = await _attendanceRecordService.GetAttendanceRecordById(id);

                if (attendanceRecord == null)
                    return NotFound($"AttendanceRecord with ID = {id} not found.");

                return Ok(attendanceRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/attendanceRecords/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateAttendanceRecord([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                DateTime? checkInTime = jsonElement.GetProperty("checkInTime").GetDateTime();
                DateTime? checkOutTime = jsonElement.GetProperty("checkOutTime").GetDateTime();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();



                if (string.IsNullOrEmpty(employeeId))
                    return BadRequest("AttendanceRecord details are incomplete.");

                var attendanceRecord = new AttendanceRecord
                {
                    AttendanceId = Guid.NewGuid().ToString("N"),
                    CheckInTime = checkInTime,
                    CheckOutTime = checkOutTime,
                    EmployeeId = employeeId
                };

                var isCreated = await _attendanceRecordService.AddAttendanceRecord(attendanceRecord);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the attendance record.");

                return Ok("Create attendance record successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/attendanceRecords/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateAttendanceRecord(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

               
                DateTime? checkInTime = jsonElement.GetProperty("checkInTime").GetDateTime();
                DateTime? checkOutTime = jsonElement.GetProperty("checkOutTime").GetDateTime();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();

                

                if (string.IsNullOrEmpty(employeeId))
                    return BadRequest("AttendanceRecord details are incomplete.");

                var attendanceRecord = new AttendanceRecord
                {
                    AttendanceId = id,
                    CheckInTime = checkInTime,
                    CheckOutTime = checkOutTime,
                    EmployeeId = employeeId
                };

                var isUpdated = await _attendanceRecordService.UpdateAttendanceRecord(attendanceRecord, id);

                if (!isUpdated)
                    return NotFound($"AttendanceRecord with ID = {id} not found.");

                return Ok("Update attendance record successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/attendanceRecords/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteAttendanceRecord(string id)
        {
            try
            {
                var isDeleted = await _attendanceRecordService.DeleteAttendanceRecord(id);

                if (!isDeleted)
                    return NotFound($"AttendanceRecord with ID = {id} not found.");

                return Ok("Delete attendance record successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
