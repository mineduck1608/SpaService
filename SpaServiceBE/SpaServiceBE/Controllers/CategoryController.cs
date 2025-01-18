using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService categoryService)
        {
            _service = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
        }

        // GET: api/categories/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategories()
        {
            try
            {
                var categories = await _service.GetAllCategories();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/categories/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Category>> GetCategoryById(string id)
        {
            try
            {
                var category = await _service.GetCategoryById(id);

                if (category == null)
                    return NotFound($"Category with ID = {id} not found.");

                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/categories/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCategory([FromBody] Category category)
        {
            if (category == null || string.IsNullOrEmpty(category.CategoryName))
                return BadRequest("Category details are incomplete.");

            category.CategoryId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.AddCategory(category);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the category.");

                return CreatedAtAction(nameof(GetCategoryById), new { id = category.CategoryId }, category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/categories/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCategory(string id, [FromBody] Category category)
        {
            if (category == null || string.IsNullOrEmpty(category.CategoryName))
                return BadRequest("Category details are incomplete.");

            category.CategoryId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.UpdateCategory(category.CategoryId, category);

                if (!isUpdated)
                    return NotFound($"Category with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/categories/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCategory(string id)
        {
            try
            {
                var isDeleted = await _service.DeleteCategory(id);

                if (!isDeleted)
                    return NotFound($"Category with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
