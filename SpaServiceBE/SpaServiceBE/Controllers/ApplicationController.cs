using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;

        public ApplicationController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            return Ok(await _applicationService.GetAllApplicationsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(string id)
        {
            var application = await _applicationService.GetApplicationByIdAsync(id);
            if (application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateApplication([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string status = jsonElement.GetProperty("status").GetString();
                string content = jsonElement.GetProperty("content").GetString();
                string accountId = jsonElement.GetProperty("accountId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(status) || string.IsNullOrEmpty(content) || string.IsNullOrEmpty(accountId))
                {
                    return BadRequest(new { msg = "Application details are incomplete or invalid." });
                }

                // Create Application object
                var application = new Application
                {
                    ApplicationId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    Status = status,
                    Content = content,
                    AccountId = accountId,
                    CreatedAt = DateTime.UtcNow
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

        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateApplication(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string status = jsonElement.GetProperty("status").GetString();
                string content = jsonElement.GetProperty("content").GetString();

                // Validate input
                if (string.IsNullOrEmpty(status) || string.IsNullOrEmpty(content))
                {
                    return BadRequest(new { msg = "Application details are incomplete or invalid." });
                }

                // Create Application object and assign ID for update
                var application = new Application
                {
                    ApplicationId = id, // Use the provided ID for the update
                    Status = status,
                    Content = content
                };

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(string id)
        {
            await _applicationService.DeleteApplicationAsync(id);
            return NoContent();
        }
    }
}
