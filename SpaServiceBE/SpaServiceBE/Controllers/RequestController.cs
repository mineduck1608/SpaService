using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult> CreateRequest([FromBody] Request request)
        {
            if (request == null ||
                string.IsNullOrEmpty(request.CustomerId) ||
                string.IsNullOrEmpty(request.ServiceId) ||
                request.StartTime == default(DateTime) ||
                request.EndTime == default(DateTime) ||
                string.IsNullOrEmpty(request.Status))
            {
                return BadRequest("Request details are incomplete or invalid.");
            }

            request.RequestId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.Add(request);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the request.");

                return CreatedAtAction(nameof(GetRequestById), new { id = request.RequestId }, request);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/requests/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateRequest(string id, [FromBody] Request request)
        {
            if (request == null ||
                string.IsNullOrEmpty(request.CustomerId) ||
                string.IsNullOrEmpty(request.ServiceId) ||
                request.StartTime == default(DateTime) ||
                request.EndTime == default(DateTime) ||
                string.IsNullOrEmpty(request.Status))
            {
                return BadRequest("Request details are incomplete or invalid.");
            }

            request.RequestId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.Update(id, request);

                if (!isUpdated)
                    return NotFound($"Request with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
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
