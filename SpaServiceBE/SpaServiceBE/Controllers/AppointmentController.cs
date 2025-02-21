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
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _servicee;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _servicee = appointmentService ?? throw new ArgumentNullException(nameof(appointmentService));
        }

        // GET: api/appointments/GetAll
        [Authorize (Roles ="Customer, Admin")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAllAppointments()
        {
            try
            {
                var appointments = await _servicee.GetAllAppointments();
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/appointments/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointmentById(string id)
        {
            try
            {
                var appointment = await _servicee.GetAppointmentById(id);

                if (appointment == null)
                    return NotFound($"Appointment with ID = {id} not found.");

                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
       
        [HttpGet("GetAppointmentByEmployeeId/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointmentFromEmployeeId(string id)
        {
            try
            {
                var appointment = await _servicee.GetAllAppointmentsFromEmployee(id);

                if (appointment == null)
                    return NotFound($"Appointment with ID = {id} not found.");

                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/appointments/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateAppointment([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string requestId = jsonElement.GetProperty("requestId").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                DateTime? startTime = jsonElement.TryGetProperty("startTime", out var startTimeProp) ? startTimeProp.GetDateTime() : null;
                DateTime? endTime = jsonElement.TryGetProperty("endTime", out var endTimeProp) ? endTimeProp.GetDateTime() : null;
                string? replacementEmployee = jsonElement.TryGetProperty("replacementEmployee", out var replacementEmployeeProp) ? replacementEmployeeProp.GetString() : null;

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(requestId) || string.IsNullOrEmpty(employeeId))
                    return BadRequest(new { msg = "Appointment details are incomplete." });

                // Tạo đối tượng Appointment
                var appointment = new Appointment
                {
                    AppointmentId = Guid.NewGuid().ToString(), // Generate unique ID
                    RequestId = requestId,
                    EmployeeId = employeeId,
                    Status = "Unprocessed", // Default status
                    StartTime = startTime,
                    EndTime = endTime,
                    ReplacementEmployee = replacementEmployee
                };

                // Gọi service để thêm appointment
                var isCreated = await _servicee.AddAppointment(appointment);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the appointment." });

                return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.AppointmentId }, appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/appointments/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateAppointment(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string requestId = jsonElement.GetProperty("requestId").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                DateTime? startTime = jsonElement.TryGetProperty("startTime", out var startTimeProp) ? startTimeProp.GetDateTime() : null;
                DateTime? endTime = jsonElement.TryGetProperty("endTime", out var endTimeProp) ? endTimeProp.GetDateTime() : null;
                string? replacementEmployee = jsonElement.TryGetProperty("replacementEmployee", out var replacementEmployeeProp) ? replacementEmployeeProp.GetString() : null;

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(requestId) || string.IsNullOrEmpty(employeeId))
                    return BadRequest(new { msg = "Appointment details are incomplete." });

                // Tạo đối tượng Appointment và gán ID cho update
                var appointment = new Appointment
                {
                    AppointmentId = id, // Use the provided ID for the update
                    RequestId = requestId,
                    EmployeeId = employeeId,
                    Status = "Pending", // Default status (you can update based on your logic)
                    StartTime = startTime,
                    EndTime = endTime,
                    ReplacementEmployee = replacementEmployee,
                    UpdatedAt = DateTime.Now // Automatically update the timestamp
                };

                // Gọi service để cập nhật appointment
                var isUpdated = await _servicee.UpdateAppointment(id, appointment);

                if (!isUpdated)
                    return NotFound(new { msg = $"Appointment with ID = {id} not found." });

                return Ok(new {msg = "Update appoinment successfully."});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/appointments/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteAppointment(string id)
        {
            try
            {
                var isDeleted = await _servicee.DeleteAppointment(id);

                if (!isDeleted)
                    return NotFound($"Appointment with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
