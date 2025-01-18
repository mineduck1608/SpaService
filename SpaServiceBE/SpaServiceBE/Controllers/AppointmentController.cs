using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
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

        // POST: api/appointments/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateAppointment([FromBody] Appointment appointment)
        {
            if (appointment == null || string.IsNullOrEmpty(appointment.RequestId) || string.IsNullOrEmpty(appointment.EmployeeId))
                return BadRequest("Appointment details are incomplete.");

            appointment.Status = "Pending"; // Default status
            appointment.AppointmentId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _servicee.AddAppointment(appointment);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the appointment.");

                return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.AppointmentId }, appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/appointments/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateAppointment(string id, [FromBody] Appointment appointment)
        {
            if (appointment == null || string.IsNullOrEmpty(appointment.RequestId) || string.IsNullOrEmpty(appointment.EmployeeId))
                return BadRequest("Appointment details are incomplete.");

            appointment.AppointmentId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _servicee.UpdateAppointment(id, appointment);

                if (!isUpdated)
                    return NotFound($"Appointment with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/appointments/Delete/{id}
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
