using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    [Route("api/attendancerecords")]
    [ApiController]
    public class AttendanceRecordController : ControllerBase
    {
        private readonly IAttendanceRecordService _attendanceRecordService;
        private readonly IEmployeeService _employeeService;
        private readonly IAccountService _accountService;



        public AttendanceRecordController(IAttendanceRecordService attendanceRecordService, IEmployeeService employeeService, IAccountService accountService)
        {
            _attendanceRecordService = attendanceRecordService ?? throw new ArgumentNullException(nameof(attendanceRecordService));
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));

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

        // GET: api/attendanceRecords/GetByAccountId/{id}
        [Authorize]
        [HttpGet("GetByAccountId/{id}")]
        public async Task<ActionResult<IEnumerable<AttendanceRecord>>> GetAllAttendanceRecordsByAccountId(string id)
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

        // PUT: api/employees/CheckInCheckOut/{id}
        [HttpPut("CheckInCheckOut/{id}")]
        public async Task<ActionResult> CheckInCheckOutEmployee(string id, [FromBody] string action)
        {
            try
            {
                var account = await _accountService.GetAccountById(id);
                if (account == null || account.Employees == null)
                {
                    return NotFound(new { msg = $"Account with ID = {id} not found or does not have an associated employee." });
                }

                var employee = await _employeeService.GetEmployeeById(account.Employees.EmployeeId);
                if (employee == null)
                {
                    return NotFound(new { msg = $"Employee not found for Account ID = {id}." });
                }

                // Lấy bản ghi điểm danh mới nhất của nhân viên
                var latestAttendance = await _attendanceRecordService.GetLatestAttendanceByEmployeeId(employee.EmployeeId);

                if (action.Equals("checkin", StringComparison.OrdinalIgnoreCase))
                {
                    // Nếu đã có CheckIn nhưng chưa CheckOut thì không được CheckIn lại
                    if (latestAttendance != null && latestAttendance.CheckInTime.HasValue && !latestAttendance.CheckOutTime.HasValue)
                    {
                        return BadRequest(new { msg = "Employee has already checked in and not yet checked out." });
                    }

                    // Tạo bản ghi mới cho CheckIn
                    var newAttendance = new AttendanceRecord
                    {
                        AttendanceId = Guid.NewGuid().ToString(),
                        EmployeeId = employee.EmployeeId,
                        CheckInTime = DateTime.Now
                    };

                    await _attendanceRecordService.AddAttendance(newAttendance);

                    return Ok(new { msg = "Employee checked in successfully.", attendance = newAttendance });
                }
                else if (action.Equals("checkout", StringComparison.OrdinalIgnoreCase))
                {
                    // Nếu chưa CheckIn thì không thể CheckOut
                    if (latestAttendance == null || !latestAttendance.CheckInTime.HasValue)
                    {
                        return BadRequest(new { msg = "Employee must check in before checking out." });
                    }

                    // Nếu đã CheckOut rồi thì không thể CheckOut lại
                    if (latestAttendance.CheckOutTime.HasValue)
                    {
                        return BadRequest(new { msg = "Employee has already checked out." });
                    }

                    // Cập nhật CheckOutTime
                    latestAttendance.CheckOutTime = DateTime.Now;
                    await _attendanceRecordService.UpdateAttendance(latestAttendance);

                    return Ok(new { msg = "Employee checked out successfully.", attendance = latestAttendance });
                }
                else
                {
                    return BadRequest(new { msg = "Invalid action. Please use 'checkin' or 'checkout'." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
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
