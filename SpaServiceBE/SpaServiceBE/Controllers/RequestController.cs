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
    [Route("api/requests")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _service;

        public RequestController(IRequestService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/requests/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Request>>> GetAllRequests()
        {
            try
            {
                var requests = await _service.GetAll();
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/requests/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Request>> GetRequestById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("RequestId is required.");

            try
            {
                var request = await _service.GetById(id);

                if (request == null)
                    return NotFound($"Request with ID = {id} not found.");

                return Ok(request);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/requests/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateRequest([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string customerId = jsonElement.GetProperty("customerId").GetString();
                string serviceId = jsonElement.GetProperty("serviceId").GetString();
                DateTime startTime = jsonElement.GetProperty("startTime").GetDateTime();
                DateTime endTime = jsonElement.GetProperty("endTime").GetDateTime();
                string status = jsonElement.GetProperty("status").GetString();
                string? customerNote = jsonElement.TryGetProperty("customerNote", out var customerNoteProp) ? customerNoteProp.GetString() : null;
                string? managerNote = jsonElement.TryGetProperty("managerNote", out var managerNoteProp) ? managerNoteProp.GetString() : null;

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(serviceId) ||
                    startTime == default(DateTime) || endTime == default(DateTime) || string.IsNullOrEmpty(status))
                {
                    return BadRequest(new { msg = "Request details are incomplete or invalid." });
                }

                // Tạo đối tượng Request
                var newRequest = new Request
                {
                    RequestId = Guid.NewGuid().ToString(), // Generate unique ID
                    CustomerId = customerId,
                    ServiceId = serviceId,
                    StartTime = startTime,
                    EndTime = endTime,
                    Status = status,
                    CustomerNote = customerNote,
                    ManagerNote = managerNote
                };

                // Gọi service để thêm request
                var isCreated = await _service.Add(newRequest);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the request." });

                return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.RequestId }, newRequest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/requests/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateRequest(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string customerId = jsonElement.GetProperty("customerId").GetString();
                string serviceId = jsonElement.GetProperty("serviceId").GetString();
                DateTime startTime = jsonElement.GetProperty("startTime").GetDateTime();
                DateTime endTime = jsonElement.GetProperty("endTime").GetDateTime();
                string status = jsonElement.GetProperty("status").GetString();
                string? customerNote = jsonElement.TryGetProperty("customerNote", out var customerNoteProp) ? customerNoteProp.GetString() : null;
                string? managerNote = jsonElement.TryGetProperty("managerNote", out var managerNoteProp) ? managerNoteProp.GetString() : null;

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(serviceId) ||
                    startTime == default(DateTime) || endTime == default(DateTime) || string.IsNullOrEmpty(status))
                {
                    return BadRequest(new { msg = "Request details are incomplete or invalid." });
                }

                // Tạo đối tượng Request và gán ID cho update
                var updatedRequest = new Request
                {
                    RequestId = id, // Assign the ID for the update
                    CustomerId = customerId,
                    ServiceId = serviceId,
                    StartTime = startTime,
                    EndTime = endTime,
                    Status = status,
                    CustomerNote = customerNote,
                    ManagerNote = managerNote
                };

                // Gọi service để cập nhật request
                var isUpdated = await _service.Update(id, updatedRequest);

                if (!isUpdated)
                    return NotFound(new { msg = $"Request with ID = {id} not found." });

                return Ok(new { msg = "Update request successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/requests/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRequest(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("RequestId is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"Request with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
