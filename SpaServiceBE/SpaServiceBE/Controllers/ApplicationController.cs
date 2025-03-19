using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Repositories.Entities;
using Services;
using Services.IServices;
using Services.Services;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/applications")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly IGuestApplicationService _guestApplicationService;

        public ApplicationController(IApplicationService applicationService, IGuestApplicationService guestApplicationService)
        {
            _applicationService = applicationService ?? throw new ArgumentNullException(nameof(applicationService));
            _guestApplicationService = guestApplicationService ?? throw new ArgumentNullException(nameof(guestApplicationService)); 
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            return Ok(await _applicationService.GetAllApplicationsAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Application>> GetApplication(string id)
        {
            var application = await _applicationService.GetApplicationByAccountIdAsync(id);
            if (application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }

        [HttpGet("GetByAccountId/{id}")]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplicationByAccountId(string id)
        {
            var application = await _applicationService.GetApplicationByAccountIdAsync(id);
            if (application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateApplication([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string content = jsonElement.GetProperty("content").GetString();
                string accountId = jsonElement.GetProperty("accountId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(content) || string.IsNullOrEmpty(accountId))
                {
                    return BadRequest(new { msg = "Application details are incomplete or invalid." });
                }

                // Create Application object
                var application = new Application
                {
                    ApplicationId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    Status = "Pending",
                    Content = content,
                    AccountId = accountId,
                    CreatedAt = DateTime.Now,
                    ResolvedBy = null,
                    ResolvedAt = null
                };

                // Call service to add application
                await _applicationService.CreateApplicationAsync(application);

                return Ok(application);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPost("GuestApplication")]
        public async Task<ActionResult> GuestApplication([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string content = jsonElement.GetProperty("content").GetString();
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string phoneNumber = jsonElement.GetProperty("phoneNumber").GetString();
                string email = jsonElement.GetProperty("email").GetString();

                // Validate input
                if (string.IsNullOrEmpty(content) || string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(email))
                {
                    return BadRequest(new { msg = "Application details are incomplete or invalid." });
                }
                   


                    var guest = new Application
                    {
                        ApplicationId = Guid.NewGuid().ToString("N"), // Generate unique ID
                        Status = "Pending",
                        Content = content,
                        CreatedAt = DateTime.UtcNow,
                        ResolvedBy = null,
                        ResolvedAt = null
                    };


                // Call service to add application
                await _applicationService.CreateApplicationAsync(guest);

                // Create GuestApplication object
                var guestApplication = new GuestApplication
                    {
                        GuestApplicationId = Guid.NewGuid().ToString("N"), // Generate unique ID
                        FullName = fullName,
                        PhoneNumber = phoneNumber,
                        Email = email,
                        ApplicationId = guest.ApplicationId,
                    };

                    // Call service to add guest application
                    await _guestApplicationService.AddAsync(guestApplication);


                    return Ok(guest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateApplication(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string status = jsonElement.GetProperty("status").GetString();
                string resolvedBy = jsonElement.GetProperty("resolvedBy").GetString();
                string managerNote = jsonElement.GetProperty("managerNote").GetString();

                // Validate input
                if (string.IsNullOrEmpty(status) || string.IsNullOrEmpty(resolvedBy))
                {
                    return BadRequest(new { msg = "Application details are incomplete or invalid." });
                }

                var application = await _applicationService.GetApplicationByIdAsync(id);

                if(application == null)
                {
                    return NotFound(new { msg = $"Application with ID = {id} not found." });

                }
                // Create Application object and assign ID for update
                application.Status = status;
                application.ResolvedBy = resolvedBy;
                application.ResolvedAt = DateTime.Now;
                application.ManagerNote = managerNote;

                // Call service to update application
                var isUpdated = await _applicationService.UpdateApplicationAsync(application);

                if (!isUpdated)
                    return NotFound(new { msg = $"Application with ID = {id} not found." });

                return Ok(application);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteApplication(string id)
        {
            await _applicationService.DeleteApplicationAsync(id);
            return NoContent();
        }
        [HttpGet("ApplicationsOf/{accountId}")]
        public async Task<ActionResult<List<Application>>> ApplicationsOfAccountAsync(string accountId)
        {
            return Ok(await _applicationService.GetApplicationByAccountIdAsync(accountId));
        }
    }
}
