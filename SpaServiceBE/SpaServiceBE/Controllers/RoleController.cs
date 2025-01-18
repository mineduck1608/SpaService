using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/roles")] // Route chung cho controller
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

        // GET: api/roles/{id}
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

        // POST: api/roles/create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateRole([FromBody] Role role)
        {
            if (role == null || string.IsNullOrEmpty(role.RoleId) || string.IsNullOrEmpty(role.RoleName))
                return BadRequest("Role details are incomplete.");

            try
            {
                var isCreated = await _roleService.AddRole(role);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the role.");

                return CreatedAtAction(nameof(GetRoleById), new { id = role.RoleId }, role);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/roles/update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateRole(string id, [FromBody] Role role)
        {
            if (role == null || string.IsNullOrEmpty(role.RoleName))
                return BadRequest("Role details are incomplete.");

            try
            {
                var isUpdated = await _roleService.UpdateRole(role, id);

                if (!isUpdated)
                    return NotFound($"Role with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/roles/delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRole(string id)
        {
            try
            {
                var isDeleted = await _roleService.DeleteRole(id);

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
