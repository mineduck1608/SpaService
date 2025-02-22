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
            return Ok(await _cosmeticCategoryService.GetAllCategories());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CosmeticCategory>> GetCategoryById(string id)
        {
            var category = await _cosmeticCategoryService.GetCategoryById(id);
            if (category == null)
                return NotFound();
            return Ok(category);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateCategory([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string categoryName = jsonElement.GetProperty("CategoryName").GetString();
                string description = jsonElement.GetProperty("CategoryDescription").GetString();

                if (string.IsNullOrEmpty(categoryName))
                    return BadRequest(new { msg = "Category details are incomplete." });

                var category = new CosmeticCategory
                {
                    CategoryId = Guid.NewGuid().ToString("N"),
                    CategoryName = categoryName,
                    CategoryDescription = description
                };

                var isCreated = await _cosmeticCategoryService.CreateCategory(category);
                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the category." });

                return CreatedAtAction(nameof(GetCategoryById), new { id = category.CategoryId }, category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCategory(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string categoryName = jsonElement.GetProperty("CategoryName").GetString();
                string description = jsonElement.GetProperty("CategoryDescription").GetString();

                if (string.IsNullOrEmpty(categoryName))
                    return BadRequest(new { msg = "Category details are incomplete." });

                var category = new CosmeticCategory
                {
                    CategoryId = id,
                    CategoryName = categoryName,
                    CategoryDescription = description
                };

                var isUpdated = await _cosmeticCategoryService.UpdateCategory(category);
                if (!isUpdated)
                    return NotFound(new { msg = $"Category with ID = {id} not found." });

                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(string id)
        {
            await _cosmeticCategoryService.DeleteCategory(id);
            return NoContent();
        }
    }
}