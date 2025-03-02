using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
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
        private readonly ICustomerService _customerService;
        private readonly IOrderService _orderService;
        private readonly IRequestService _requestService; // Added service for requests
        private readonly ISpaServiceService _spaServiceService; // Added service for spa services
        private readonly ICustomerMembershipService _customerMembershipService;


        public MembershipController(IMembershipService service,
            ICustomerService customerService,
            IOrderService orderService,
            IRequestService requestService,
            ISpaServiceService spaServiceService,
            ICustomerMembershipService customerMembershipService)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _customerService = customerService ?? throw new ArgumentNullException(nameof(customerService));
            _orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
            _requestService = requestService ?? throw new ArgumentNullException(nameof(requestService));
            _spaServiceService = spaServiceService ?? throw new ArgumentNullException(nameof(spaServiceService));
            _customerMembershipService = customerMembershipService ?? throw new ArgumentNullException(nameof(customerMembershipService));
        }

        // GET: api/memberships/GetAll
        [Authorize]
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
        [Authorize]
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
                float totalPayment = jsonElement.GetProperty("totalPayment").GetSingle();
                int discount = jsonElement.GetProperty("discount").GetInt32();

                // Validate input
                if (string.IsNullOrEmpty(type) || totalPayment <= 0 || discount < 0 || discount > 100)
                {
                    return BadRequest(new { msg = "Membership details are incomplete or invalid." });
                }

                var membership = new Membership
                {
                    MembershipId = Guid.NewGuid().ToString("N"),
                    Type = type,
                    TotalPayment = totalPayment,
                    Discount = discount
                };

                // Call service to add membership
                var isCreated = await _service.AddMembership(membership);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the membership." });

                return CreatedAtAction(nameof(GetMembershipById), new { id = membership.MembershipId }, membership);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/memberships/Update/{id}
       [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateMembership(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string type = jsonElement.GetProperty("type").GetString();
                float totalPayment = jsonElement.GetProperty("totalPayment").GetSingle();
                int discount = jsonElement.GetProperty("discount").GetInt32();

                // Validate input
                if (string.IsNullOrEmpty(type) || totalPayment <= 0 || discount < 0 || discount > 100)
                {
                    return BadRequest(new { msg = "Membership details are incomplete or invalid." });
                }

                var membership = new Membership
                {
                    MembershipId = id,  // Set the ID for the update
                    Type = type,
                    TotalPayment = totalPayment,
                    Discount = discount
                };

                // Call service to update membership
                var isUpdated = await _service.UpdateMembership(id, membership);

                if (!isUpdated)
                    return NotFound(new { msg = $"Membership with ID = {id} not found." });

                return Ok(new { msg = "Update membership successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/memberships/Delete/{id}
        [Authorize]
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
