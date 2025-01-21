using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
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
        public async Task<ActionResult> CreateMembership([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string type = jsonElement.GetProperty("type").GetString();
                double totalPayment = jsonElement.GetProperty("totalPayment").GetDouble();
                int discount = jsonElement.GetProperty("discount").GetInt32();

                if (string.IsNullOrEmpty(type) || totalPayment <= 0 || discount < 0 || discount > 100)
                {
                    return BadRequest("Membership details are incomplete or invalid.");
                }

                var membership = new Membership
                {
                    MembershipId = Guid.NewGuid().ToString("N"),
                    Type = type,
                    TotalPayment = totalPayment,
                    Discount = discount
                };

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
        public async Task<ActionResult> UpdateMembership(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string type = jsonElement.GetProperty("type").GetString();
                double totalPayment = jsonElement.GetProperty("totalPayment").GetDouble();
                int discount = jsonElement.GetProperty("discount").GetInt32();

                if (string.IsNullOrEmpty(type) || totalPayment <= 0 || discount < 0 || discount > 100)
                {
                    return BadRequest("Membership details are incomplete or invalid.");
                }

                var membership = new Membership
                {
                    MembershipId = id,
                    Type = type,
                    TotalPayment = totalPayment,
                    Discount = discount
                };

                var isUpdated = await _service.UpdateMembership(id, membership);

                if (!isUpdated)
                    return NotFound($"Membership with ID = {id} not found.");

                return Ok("Update membership successfully.");
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

                return Ok("Delete membership successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
