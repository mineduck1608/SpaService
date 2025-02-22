using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerMembershipController : ControllerBase
    {
        private readonly ICustomerMembershipService _customerMembershipService;

        public CustomerMembershipController(ICustomerMembershipService customerMembershipService)
        {
            _customerMembershipService = customerMembershipService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _customerMembershipService.GetAllAsync());
        }

        [HttpGet("{customerId}/{membershipId}")]
        public async Task<IActionResult> GetById(string customerId, string membershipId)
        {
            return Ok(await _customerMembershipService.GetByIdAsync(customerId, membershipId));
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CustomerMembership entity)
        {
            try
            {
                var jsonElement = (JsonElement)(object)entity;

                string customerId = jsonElement.GetProperty("CustomerId").GetString();
                string membershipId = jsonElement.GetProperty("MembershipId").GetString();
                DateOnly startDate;
                DateOnly endDate;

                if (!DateOnly.TryParse(jsonElement.GetProperty("StartDate").GetString(), out startDate) ||
                    !DateOnly.TryParse(jsonElement.GetProperty("EndDate").GetString(), out endDate))
                {
                    return BadRequest(new { msg = "Invalid date format." });
                }

                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(membershipId))
                {
                    return BadRequest("CustomerMembership details are incomplete.");
                }

                var newMembership = new CustomerMembership
                {
                    CustomerId = Guid.NewGuid().ToString("N"),
                    MembershipId = membershipId,
                    StartDate = startDate,
                    EndDate = endDate
                };

                await _customerMembershipService.CreateAsync(newMembership);
                return CreatedAtAction(nameof(GetById), new { id = newMembership.CustomerId }, newMembership);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, [FromBody] CustomerMembership entity)
        {
            try
            {
                var jsonElement = (JsonElement)(object)entity;

                string customerId = jsonElement.GetProperty("CustomerId").GetString();
                string membershipId = jsonElement.GetProperty("MembershipId").GetString();
                DateOnly startDate;
                DateOnly endDate;

                if (!DateOnly.TryParse(jsonElement.GetProperty("StartDate").GetString(), out startDate) ||
                    !DateOnly.TryParse(jsonElement.GetProperty("EndDate").GetString(), out endDate))
                {
                    return BadRequest(new { msg = "Invalid date format." });
                }

                if (id != customerId)
                {
                    return BadRequest(new { msg = "Customer ID mismatch." });
                }

                var updatedMembership = new CustomerMembership
                {
                    CustomerId = customerId,
                    MembershipId = membershipId,
                    StartDate = startDate,
                    EndDate = endDate
                };

                var isUpdated = await _customerMembershipService.UpdateAsync(updatedMembership);
                if (!isUpdated)
                {
                    return NotFound(new { msg = $"CustomerMembership with ID = {id} not found." });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{customerId}/{membershipId}")]
        public async Task<IActionResult> Delete(string customerId, string membershipId)
        {
            await _customerMembershipService.DeleteAsync(customerId, membershipId);
            return Ok();
        }
    }
}
