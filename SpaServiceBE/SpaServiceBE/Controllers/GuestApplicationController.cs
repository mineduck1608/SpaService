using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/guestapplications")]
    [ApiController]
    public class GuestApplicationController : ControllerBase
    {
        private readonly IGuestApplicationService _guestApplicationService;

        public GuestApplicationController(IGuestApplicationService guestApplicationService)
        {
            _guestApplicationService = guestApplicationService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<GuestApplication>>> GetAllGuestApplication()
        {
            return Ok(await _guestApplicationService.GetAllAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<GuestApplication>> GetGuestApplicationById(string id)
        {
            var guestApplication = await _guestApplicationService.GetGuestApplicationById(id);
            if (guestApplication == null) return NotFound();
            return Ok(guestApplication);
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> Create([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string phoneNumber = jsonElement.GetProperty("phoneNumber").GetString();
                string email = jsonElement.GetProperty("email").GetString();
                string applicationId = jsonElement.GetProperty("applicationId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(applicationId))
                {
                    return BadRequest(new { msg = "Guest application details are incomplete or invalid." });
                }

                // Create GuestApplication object
                var guestApplication = new GuestApplication
                {
                    GuestApplicationId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    FullName = fullName,
                    PhoneNumber = phoneNumber,
                    Email = email,
                    ApplicationId = applicationId
                };

                // Call service to add guest application
                await _guestApplicationService.AddAsync(guestApplication);

                return CreatedAtAction(nameof(GetGuestApplicationById), new { id = guestApplication.GuestApplicationId }, guestApplication);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> Update(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string phoneNumber = jsonElement.GetProperty("phoneNumber").GetString();
                string email = jsonElement.GetProperty("email").GetString();
                string applicationId = jsonElement.GetProperty("applicationId").GetString();
                // Validate input
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(applicationId))
                {
                    return BadRequest(new { msg = "Guest application details are incomplete or invalid." });
                }

                // Create GuestApplication object and assign ID for update
                var guestApplication = new GuestApplication
                {
                    GuestApplicationId = id, // Use provided ID for update
                    FullName = fullName,
                    PhoneNumber = phoneNumber,
                    Email = email,
                    ApplicationId = applicationId
                };

                // Call service to update guest application
                var isUpdated = await _guestApplicationService.UpdateAsync(guestApplication);

                if (!isUpdated)
                    return NotFound(new { msg = $"Guest application with ID = {id} not found." });

                return Ok(guestApplication);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await _guestApplicationService.DeleteAsync(id);
            return NoContent();
        }
    }
}
