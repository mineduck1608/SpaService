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
    [Route("api/roles")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService ?? throw new ArgumentNullException(nameof(roleService));
        }

        // GET: api/roles
       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            try
            {
                var roles = await _roleService.GetAllRoles();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/roles/GetById/{id}
     
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Role>> GetRoleById(string id)
        {
            try
            {
                var role = await _roleService.GetRoleById(id);

                if (role == null)
                    return NotFound($"Role with ID = {id} not found.");

                return Ok(role);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/roles/Create
      
        [HttpPost("Create")]
        public async Task<ActionResult> CreateRole([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string roleName = jsonElement.GetProperty("roleName").GetString();

                if (string.IsNullOrEmpty(roleName))
                    return BadRequest("Role details are incomplete.");

                // Tạo RoleId tự động
                var role = new Role
                {
                    RoleId = Guid.NewGuid().ToString("N"),
                    RoleName = roleName
                };

                var isCreated = await _roleService.AddRole(role);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the role.");

                return Ok("Create role successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/roles/Update/{id}
      
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateRole(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string roleName = jsonElement.GetProperty("roleName").GetString();

                if (string.IsNullOrEmpty(roleName))
                    return BadRequest("Role details are incomplete.");

                var role = new Role
                {
                    RoleId = id,
                    RoleName = roleName
                };

                var isUpdated = await _roleService.UpdateRole(role, id);

                if (!isUpdated)
                    return NotFound($"Role with ID = {id} not found.");

                return Ok("Update role successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/roles/Delete/{id}
      
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRole(string id)
        {
            try
            {
                var isDeleted = await _roleService.DeleteRole(id);

                if (!isDeleted)
                    return NotFound($"Role with ID = {id} not found.");

                return Ok("Delete role successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
