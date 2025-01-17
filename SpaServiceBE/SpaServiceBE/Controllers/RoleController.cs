using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService ?? throw new ArgumentNullException(nameof(roleService));
        }

        // GET: api/role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            try
            {
                var roles = await _roleService.GetAllRolesAsync();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/role/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRoleById(string id)
        {
            try
            {
                var role = await _roleService.GetRoleByIdAsync(id);

                if (role == null)
                    return NotFound($"Role with ID = {id} not found.");

                return Ok(role);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/role
        [HttpPost]
        public async Task<ActionResult> CreateRole([FromQuery] string roleId, [FromQuery] string roleName)
        {
            if (string.IsNullOrEmpty(roleId) || string.IsNullOrEmpty(roleName))
                return BadRequest("Role details are incomplete.");

            var role = new Role
            {
                RoleId = roleId,
                RoleName = roleName
            };

            try
            {
                var isCreated = await _roleService.AddRoleAsync(role);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the role.");

                return CreatedAtAction(nameof(GetRoleById), new { id = role.RoleId }, role);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/role/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRole(string id, [FromQuery] string roleName)
        {
            if (string.IsNullOrEmpty(roleName))
                return BadRequest("Role details are incomplete.");

            var role = new Role
            {
                RoleId = id,
                RoleName = roleName
            };

            try
            {
                var isUpdated = await _roleService.UpdateRoleAsync(role, id);

                if (!isUpdated)
                    return NotFound($"Role with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/role/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRole(string id)
        {
            try
            {
                var isDeleted = await _roleService.DeleteRoleAsync(id);

                if (!isDeleted)
                    return NotFound($"Role with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
