using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/cosmeticcategories")]
    [ApiController]
    public class CosmeticCategoryController : ControllerBase
    {
        private readonly ICosmeticCategoryService _cosmeticCategoryService;

        public CosmeticCategoryController(ICosmeticCategoryService cosmeticCategoryService)
        {
            _cosmeticCategoryService = cosmeticCategoryService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CosmeticCategory>>> GetAllCategories()
        {
            return Ok(await _cosmeticCategoryService.GetAllCosmeticCategories());
        }
        

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<CosmeticCategory>> GetCosmeticCategoryById(string id)
        {
            var category = await _cosmeticCategoryService.GetCosmeticCategoryById(id);
            if (category == null)
                return NotFound();
            return Ok(category);
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCosmeticCategory([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string categoryName = jsonElement.GetProperty("categoryName").GetString();
                string description = jsonElement.GetProperty("categoryDescription").GetString();

                if (string.IsNullOrEmpty(categoryName) || string.IsNullOrEmpty(description))
                    return BadRequest(new { msg = "Category details are incomplete." });

                var category = new CosmeticCategory
                {
                    CategoryId = Guid.NewGuid().ToString("N"),
                    CategoryName = categoryName,
                    CategoryDescription = description
                };

                var isCreated = await _cosmeticCategoryService.CreateCosmeticCategory(category);
                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the category." });

                return CreatedAtAction(nameof(GetCosmeticCategoryById), new { category.CategoryId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCosmeticCategory(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string categoryName = jsonElement.GetProperty("categoryName").GetString();
                string description = jsonElement.GetProperty("categoryDescription").GetString();

                if (string.IsNullOrEmpty(categoryName) || string.IsNullOrEmpty(description))
                    return BadRequest(new { msg = "Category details are incomplete." });

                var category = new CosmeticCategory
                {
                    CategoryId = id,
                    CategoryName = categoryName,
                    CategoryDescription = description
                };

                var isUpdated = await _cosmeticCategoryService.UpdateCosmeticCategory(category);
                if (!isUpdated)
                    return NotFound(new { msg = $"Category with ID = {id} not found." });

                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCosmeticCategory(string id)
        {
            await _cosmeticCategoryService.DeleteCosmeticCategory(id);
            return NoContent();
        }
        [HttpGet("CosmeticCategory")]
        public async Task<ActionResult> GetTotalCosmeticCategory()
        {
            var total = await _cosmeticCategoryService.GetTotalCosmeticCategory();
            return Ok($"total Cosmetic Category:{total}");
        }
        [HttpGet("OrderByCategory")]
        public async Task<IActionResult> OrderByCategory()
        {
            try
            {
                var rs = _cosmeticCategoryService.OrderByCategory();
                var cats = await _cosmeticCategoryService.GetAllCosmeticCategories();
                var category = rs.Select(v => new
                {
                    category = cats.FirstOrDefault(x => x.CategoryId == v.Key).CategoryName,
                    revenue = v.Value
                });
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
    }
}