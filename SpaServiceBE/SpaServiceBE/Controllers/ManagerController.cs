using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/managers")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerService _managerService;

        public ManagerController(IManagerService managerService)
        {
            _managerService = managerService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Manager>>> GetAllManagers()
        {
            return Ok(await _managerService.GetAllManagers());
        }
        [HttpGet("GetAllWorkingManager")]
        public async Task<ActionResult<IEnumerable<Manager>>> GetAllWorkingManagers()
        {
            return Ok(await _managerService.GetAllWorkingManagers());
        }
        [HttpGet("GetAllRetiredManager")]
        public async Task<ActionResult<IEnumerable<Manager>>> GetAllRetiredManagers()
        {
            return Ok(await _managerService.GetAllRetiredManagers());
        }
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Manager>> GetManager(string id)
        {
            var manager = await _managerService.GetManagerById(id);
            if (manager == null) return NotFound();
            return Ok(manager);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateManager([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string position = jsonElement.GetProperty("position").GetString();
                string status = jsonElement.GetProperty("status").GetString();
                string image = jsonElement.GetProperty("image").GetString();
                string accountId = jsonElement.GetProperty("accountId").GetString();
                string? phone = jsonElement.TryGetProperty("phone", out var phoneProp) ? phoneProp.GetString() : null;
                string? email = jsonElement.TryGetProperty("email", out var emailProp) ? emailProp.GetString() : null;
                DateOnly hireDate;
                if (!DateOnly.TryParse(jsonElement.GetProperty("hireDate").GetString(), out hireDate))
                {
                    return BadRequest(new { msg = "Invalid date format." });
                }

                // Validate input
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(position) || string.IsNullOrEmpty(status) || string.IsNullOrEmpty(image) || string.IsNullOrEmpty(accountId))
                {
                    return BadRequest(new { msg = "Manager details are incomplete or invalid." });
                }

                // Create Manager object
                var manager = new Manager
                {
                    ManagerId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    FullName = fullName,
                    Position = position,
                    Status = status,
                    Image = image,
                    AccountId = accountId,
                    Phone = phone,
                    Email = email,
                    HireDate = hireDate
                };

                // Call service to add manager
                await _managerService.AddManager(manager);

                return CreatedAtAction(nameof(GetManager), new { id = manager.ManagerId }, manager);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateManager(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string position = jsonElement.GetProperty("position").GetString();
                string status = jsonElement.GetProperty("status").GetString();
                string image = jsonElement.GetProperty("image").GetString();
                string? phone = jsonElement.TryGetProperty("phone", out var phoneProp) ? phoneProp.GetString() : null;
                string? email = jsonElement.TryGetProperty("email", out var emailProp) ? emailProp.GetString() : null;
                DateOnly hireDate;
                if (!DateOnly.TryParse(jsonElement.GetProperty("hireDate").GetString(), out hireDate))
                {
                    return BadRequest(new { msg = "Invalid date format." });
                }
                // Validate input
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(position) || string.IsNullOrEmpty(status) || string.IsNullOrEmpty(image))
                {
                    return BadRequest(new { msg = "Manager details are incomplete or invalid." });
                }

                // Create Manager object
                var manager = new Manager
                {
                    ManagerId = id, // Use provided ID for update
                    FullName = fullName,
                    Position = position,
                    Status = status,
                    Image = image,
                    Phone = phone,
                    Email = email,
                    HireDate = hireDate
                };

                // Call service to update manager
                var isUpdated = await _managerService.UpdateManager(manager);

                if (!isUpdated)
                    return NotFound(new { msg = $"Manager with ID = {id} not found." });

                return Ok(manager);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteManager(string id)
        {
            await _managerService.DeleteManager(id);
            return NoContent();
        }

        [HttpGet("GetManagerByAccountId/{id}")]
        public async Task<ActionResult<Manager>> GetManagerByAccountId(string id)
        {
            try
            {
                var manager = await _managerService.GetManagerByAccountId(id);

                if (manager == null)
                    return NotFound($"No managers found.");

                return Ok(manager);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
