using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/memberships")]
    [ApiController]
    public class MembershipController : ControllerBase
    {
        private readonly IMembershipService _service;

        public MembershipController(IMembershipService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/memberships/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Membership>>> GetAllMemberships()
        {
            try
            {
                var memberships = await _service.GetAllMemberships();
                return Ok(memberships);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/memberships/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Membership>> GetMembershipById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("MembershipId is required.");

            try
            {
                var membership = await _service.GetMembershipById(id);

                if (membership == null)
                    return NotFound($"Membership with ID = {id} not found.");

                return Ok(membership);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/memberships/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateMembership([FromBody] Membership membership)
        {
            if (membership == null ||
                string.IsNullOrEmpty(membership.Type) ||
                membership.Min <= 0 ||
                membership.Max <= 0 ||
                membership.Discount < 0 || membership.Discount > 100)
            {
                return BadRequest("Membership details are incomplete or invalid.");
            }

            membership.MembershipId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.AddMembership(membership);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the membership.");

                return CreatedAtAction(nameof(GetMembershipById), new { id = membership.MembershipId }, membership);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/memberships/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateMembership(string id, [FromBody] Membership membership)
        {
            if (membership == null ||
                string.IsNullOrEmpty(membership.Type) ||
                membership.Min <= 0 ||
                membership.Max <= 0 ||
                membership.Discount < 0 || membership.Discount > 100)
            {
                return BadRequest("Membership details are incomplete or invalid.");
            }

            membership.MembershipId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.UpdateMembership(id, membership);

                if (!isUpdated)
                    return NotFound($"Membership with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/memberships/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteMembership(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("MembershipId is required.");

            try
            {
                var isDeleted = await _service.DeleteMembership(id);

                if (!isDeleted)
                    return NotFound($"Membership with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
