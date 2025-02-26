using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/customermemberships")]
    [ApiController]
    public class CustomerMembershipController : ControllerBase
    {
        private readonly ICustomerMembershipService _customerMembershipService;

        public CustomerMembershipController(ICustomerMembershipService customerMembershipService)
        {
            _customerMembershipService = customerMembershipService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllCustomerMembership()
        {
            return Ok(await _customerMembershipService.GetAllAsync());
        }

        [HttpGet("GetById/{customerId}/{membershipId}")]
        public async Task<IActionResult> GetCustomerMembershipById(string customerId, string membershipId)
        {
            return Ok(await _customerMembershipService.GetCustomerMembershipById(customerId, membershipId));
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateCustomerMembership([FromBody] CustomerMembership entity)
        {
            try
            {
                var jsonElement = (JsonElement)(object)entity;

                string customerId = jsonElement.GetProperty("customerId").GetString();
                string membershipId = jsonElement.GetProperty("membershipId").GetString();

                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(membershipId))
                {
                    return BadRequest("CustomerMembership details are incomplete.");
                }

                var newMembership = new CustomerMembership
                {
                    CustomerId = Guid.NewGuid().ToString("N"),
                    MembershipId = membershipId,
                    StartDate = DateOnly.FromDateTime(DateTime.Now),
                    EndDate = null
                };

                await _customerMembershipService.CreateAsync(newMembership);
                return CreatedAtAction(nameof(GetCustomerMembershipById), new { id = newMembership.CustomerId }, newMembership);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCustomerMembership(string id, [FromBody] CustomerMembership entity)
        {
            try
            {
                var jsonElement = (JsonElement)(object)entity;

                string customerId = jsonElement.GetProperty("customerId").GetString();
                string membershipId = jsonElement.GetProperty("membershipId").GetString();
                DateOnly startDate;
                DateOnly endDate;

                if (!DateOnly.TryParse(jsonElement.GetProperty("startDate").GetString(), out startDate) ||
                    !DateOnly.TryParse(jsonElement.GetProperty("endDate").GetString(), out endDate))
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

        [HttpDelete("Delete/{customerId}/{membershipId}")]
        public async Task<IActionResult> DeleteCustomerMembership(string customerId, string membershipId)
        {
            await _customerMembershipService.DeleteAsync(customerId, membershipId);
            return Ok();
        }

        [HttpGet("FindNewestByCustomerId/{id}")]
        public async Task<ActionResult<CustomerMembership>> FindNewestByCustomerId(string id)
        {

            var customerMembership = await _customerMembershipService.FindNewestByCustomerId(id);

            if (customerMembership == null)
                return null;

            return Ok(customerMembership);


        }
    }
}
