using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/promotions")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly IPromotionService _service;

        public PromotionController(IPromotionService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/promotions/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetAllPromotions()
        {
            try
            {
                var promotions = await _service.GetAll();
                return Ok(promotions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/promotions/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Promotion>> GetPromotionById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("PromotionId is required.");

            try
            {
                var promotion = await _service.GetById(id);

                if (promotion == null)
                    return NotFound($"Promotion with ID = {id} not found.");

                return Ok(promotion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/promotions/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreatePromotion([FromBody] Promotion promotion)
        {
            if (promotion == null ||
                string.IsNullOrEmpty(promotion.PromotionCode) ||
                string.IsNullOrEmpty(promotion.PromotionName) ||
                promotion.DiscountValue <= 0)
            {
                return BadRequest("Promotion details are incomplete or invalid.");
            }

            promotion.PromotionId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.Add(promotion);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the promotion.");

                return CreatedAtAction(nameof(GetPromotionById), new { id = promotion.PromotionId }, promotion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/promotions/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdatePromotion(string id, [FromBody] Promotion promotion)
        {
            if (promotion == null ||
                string.IsNullOrEmpty(promotion.PromotionCode) ||
                string.IsNullOrEmpty(promotion.PromotionName) ||
                promotion.DiscountValue <= 0)
            {
                return BadRequest("Promotion details are incomplete or invalid.");
            }

            promotion.PromotionId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.Update(id, promotion);

                if (!isUpdated)
                    return NotFound($"Promotion with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/promotions/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeletePromotion(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("PromotionId is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"Promotion with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
