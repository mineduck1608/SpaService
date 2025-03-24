using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/feedbacks")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _service;

        public FeedbackController(IFeedbackService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/feedbacks/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _service.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/feedbacks/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Feedback>> GetFeedbackById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("FeedbackId is required.");

            try
            {
                var feedback = await _service.GetFeedbackById(id);

                if (feedback == null)
                    return NotFound($"Feedback with ID = {id} not found.");

                return Ok(feedback);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("GetFeedbackByServiceId/{id}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbackByService(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("FeedbackId is required.");

            try
            {
                var feedback = await _service.GetFeedbackByServiceId(id);

                if (feedback == null)
                    return NotFound($"Feedback with ID = {id} not found.");

                return Ok(feedback);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetFeedbackByAppointmentId/{id}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbackByAppointment(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("FeedbackId is required.");

            try
            {
                var feedback = await _service.GetFeedbackByAppointmentId(id);

                if (feedback == null)
                    return NotFound($"Feedback with ID = {id} not found.");

                return Ok(feedback);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/feedbacks/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateFeedback([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string feedbackMessage = jsonElement.GetProperty("feedbackMessage").GetString();
                byte rating = jsonElement.GetProperty("rating").GetByte();
                string createdBy = jsonElement.GetProperty("createdBy").GetString();
                string appointmentId = jsonElement.GetProperty("appointmentId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(feedbackMessage) || rating < 1 || rating > 5 ||
                    string.IsNullOrEmpty(createdBy) || string.IsNullOrEmpty(appointmentId))
                {
                    return BadRequest(new { msg = "Feedback details are incomplete or invalid." });
                }

                // Tạo đối tượng Feedback
                var feedback = new Feedback
                {
                    FeedbackId = Guid.NewGuid().ToString(), // Generate unique ID
                    FeedbackMessage = feedbackMessage,
                    Rating = rating,
                    CreatedBy = createdBy,
                    AppointmentId = appointmentId,
                    CreatedAt = DateTime.Now
                };

                // Gọi service để thêm feedback
                var isCreated = await _service.AddFeedback(feedback);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the feedback." });

                return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.FeedbackId }, feedback);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/feedbacks/Update/{id}
        [Authorize (Roles = "Customer")]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateFeedback(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string feedbackMessage = jsonElement.GetProperty("feedbackMessage").GetString();
                byte rating = jsonElement.GetProperty("rating").GetByte();
                string createdBy = jsonElement.GetProperty("createdBy").GetString();
                string appointmentId = jsonElement.GetProperty("appointmentId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(feedbackMessage) || rating < 1 || rating > 5 ||
                    string.IsNullOrEmpty(createdBy) || string.IsNullOrEmpty(appointmentId))
                {
                    return BadRequest(new { msg = "Feedback details are incomplete or invalid." });
                }

                // Tạo đối tượng Feedback và gán ID cho update
                var feedback = new Feedback
                {
                    FeedbackId = id,  // Use the provided ID for the update
                    FeedbackMessage = feedbackMessage,
                    Rating = rating,
                    CreatedBy = createdBy,
                    AppointmentId = appointmentId,
                    CreatedAt = DateTime.UtcNow  // Optionally update the created timestamp if necessary
                };

                // Gọi service để cập nhật feedback
                var isUpdated = await _service.UpdateFeedback(id, feedback);

                if (!isUpdated)
                    return NotFound(new { msg = $"Feedback with ID = {id} not found." });

                return Ok(new { msg = "Update feedback successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/feedbacks/Delete/{id}
        [Authorize (Roles ="Admin, Customer")]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteFeedback(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("FeedbackId is required.");

            try
            {
                var isDeleted = await _service.DeleteFeedback(id);

                if (!isDeleted)
                    return NotFound($"Feedback with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("OrderByRating")]
        public IActionResult OrderByRating()
        {
            try
            {
                var s = _service.OrderByRating();
                var rs = s.Select(x => new
                {
                    rating = x.Key,
                    count = x.Value
                });
                return Ok(rs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
