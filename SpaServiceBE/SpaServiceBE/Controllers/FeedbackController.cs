using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
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

        // POST: api/feedbacks/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateFeedback([FromBody] Feedback feedback)
        {
            if (feedback == null ||
                string.IsNullOrEmpty(feedback.FeedbackMessage) ||
                feedback.Rating < 1 || feedback.Rating > 5 ||
                string.IsNullOrEmpty(feedback.CreatedBy) ||
                string.IsNullOrEmpty(feedback.ServiceId))
            {
                return BadRequest("Feedback details are incomplete or invalid.");
            }

            feedback.FeedbackId = Guid.NewGuid().ToString(); // Generate unique ID
            feedback.CreatedAt = DateTime.UtcNow;

            try
            {
                var isCreated = await _service.AddFeedback(feedback);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the feedback.");

                return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.FeedbackId }, feedback);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/feedbacks/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateFeedback(string id, [FromBody] Feedback feedback)
        {
            if (feedback == null ||
                string.IsNullOrEmpty(feedback.FeedbackMessage) ||
                feedback.Rating < 1 || feedback.Rating > 5 ||
                string.IsNullOrEmpty(feedback.CreatedBy) ||
                string.IsNullOrEmpty(feedback.ServiceId))
            {
                return BadRequest("Feedback details are incomplete or invalid.");
            }

            feedback.FeedbackId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.UpdateFeedback(id, feedback);

                if (!isUpdated)
                    return NotFound($"Feedback with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/feedbacks/Delete/{id}
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
    }
}
