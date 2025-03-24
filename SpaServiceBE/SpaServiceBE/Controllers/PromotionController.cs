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
    [Route("api/promotions")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly IPromotionService _service;
        private readonly ITransactionService _transactionService;

        public PromotionController(IPromotionService service, ITransactionService transactionService)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _transactionService = transactionService ?? throw new ArgumentNullException(nameof(transactionService));
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
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Promotion>> GetPromotionById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("PromotionCode is required.");

            try
            {
                var promotion = await _service.GetById(id);

                if (promotion == null)
                    return NotFound($"PromotionCode with ID = {id} not found.");

                return Ok(promotion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("GetByCode/{code}/{customerId}")]
        public async Task<ActionResult<Promotion>> GetPromotionByCode(string code, string customerId)
        {
            if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(customerId))
                return BadRequest("PromotionCode and CustomerId are required.");

            try
            {
                // Kiểm tra xem khách hàng đã sử dụng chưa
                bool isUsed = await _service.IsPromotionUsed(customerId, code);
                if (isUsed)
                {
                    return BadRequest("This promotion code has already been used.");
                }

                var promotion = await _service.GetByCode(code);
                if (promotion == null)
                    return NotFound($"PromotionCode with code {code} not found.");

                return Ok(promotion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // POST: api/promotions/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreatePromotion([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string promotionCode = jsonElement.GetProperty("promotionCode").GetString();
                string promotionName = jsonElement.GetProperty("promotionName").GetString();
                float discountValue = jsonElement.GetProperty("discountValue").GetSingle();
                bool isActive = jsonElement.GetProperty("isActive").GetBoolean();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(promotionCode) || string.IsNullOrEmpty(promotionName) || discountValue <= 0)
                {
                    return BadRequest(new { msg = "PromotionCode details are incomplete or invalid." });
                }

                // Tạo đối tượng PromotionCode
                var promotion = new Promotion
                {
                    PromotionId = Guid.NewGuid().ToString(), // Generate unique ID
                    PromotionCode = promotionCode,
                    PromotionName = promotionName,
                    DiscountValue = discountValue,
                    IsActive = isActive
                };

                // Gọi service để thêm promotion
                var isCreated = await _service.Add(promotion);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the promotion." });

                return CreatedAtAction(nameof(GetPromotionById), new { id = promotion.PromotionId }, promotion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/promotions/Update/{id}
        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdatePromotion(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string promotionCode = jsonElement.GetProperty("promotionCode").GetString();
                string promotionName = jsonElement.GetProperty("promotionName").GetString();
                float discountValue = jsonElement.GetProperty("discountValue").GetSingle();
                bool isActive = jsonElement.GetProperty("isActive").GetBoolean();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(promotionCode) || string.IsNullOrEmpty(promotionName) || discountValue <= 0)
                {
                    return BadRequest(new { msg = "PromotionCode details are incomplete or invalid." });
                }

                // Tạo đối tượng PromotionCode và gán ID cho update
                var promotion = new Promotion
                {
                    PromotionId = id, // Assign the ID for the update
                    PromotionCode = promotionCode,
                    PromotionName = promotionName,
                    DiscountValue = discountValue,
                    IsActive = isActive
                };

                // Gọi service để cập nhật promotion
                var isUpdated = await _service.Update(id, promotion);

                if (!isUpdated)
                    return NotFound(new { msg = $"PromotionCode with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/promotions/Delete/{id}
        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeletePromotion(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("PromotionCode is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"PromotionCode with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
