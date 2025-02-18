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

        [HttpGet("EmployeesOf/{id}")]
        public async Task<ActionResult<Category>> GetEmployeesOf(string id)
        {
            try
            {
                var categories = await _service.GetWithEmployee(id);
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/categories/GetById/{id}
        [Authorize]
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
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCategory([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string categoryName = jsonElement.GetProperty("categoryName").GetString();
                string categoryImage = jsonElement.GetProperty("categoryImage").GetString();
                string categoryDescription = jsonElement.GetProperty("categoryDescription").GetString();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(categoryName) || string.IsNullOrEmpty(categoryImage) || string.IsNullOrEmpty(categoryDescription))
                    return BadRequest(new { msg = "Category details are incomplete." });

                // Kiểm tra danh mục đã tồn tại chưa
                var existingCategory = await _service.GetCategoryByName(categoryName);
                if (existingCategory != null)
                    return Conflict(new { msg = "Category already exists." });

                // Tạo đối tượng danh mục
                var category = new Category
                {
                    CategoryId = Guid.NewGuid().ToString("N"),
                    CategoryName = categoryName,
                    CategoryImage = categoryImage,
                    CategoryDescription = categoryDescription,
                };

                // Gọi service để thêm danh mục
                var isCreated = await _service.AddCategory(category);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the category." });

                return Ok(new { msg = "Create category successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/categories/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCategory(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string categoryName = jsonElement.GetProperty("categoryName").GetString();
                string categoryImage = jsonElement.GetProperty("categoryImage").GetString();
                string categoryDescription = jsonElement.GetProperty("categoryDescription").GetString();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(categoryName) || string.IsNullOrEmpty(categoryImage) || string.IsNullOrEmpty(categoryDescription))
                    return BadRequest(new { msg = "Category details are incomplete." });

                // Tạo đối tượng danh mục với dữ liệu đã cập nhật
                var category = new Category
                {
                    CategoryId = id, // Assign the ID for the update
                    CategoryName = categoryName,
                    CategoryImage = categoryImage,
                    CategoryDescription = categoryDescription
                };

                // Gọi service để cập nhật danh mục
                var isUpdated = await _service.UpdateCategory(category.CategoryId, category);

                if (!isUpdated)
                    return NotFound(new { msg = $"Category with ID = {id} not found." });

                return Ok(new { msg = "Update category successfully."});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/categories/Delete/{id}
        [Authorize]
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
