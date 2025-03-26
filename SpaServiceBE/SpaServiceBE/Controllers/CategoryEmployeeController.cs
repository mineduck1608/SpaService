using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/categoryemployees")]
    [ApiController]
    public class CategoryEmployeeController : ControllerBase
    {
        private readonly ICategoryEmployeeService _service;

        // Only one constructor
        public CategoryEmployeeController(ICategoryEmployeeService categoryEmployeeService)
        {
            _service = categoryEmployeeService ?? throw new ArgumentNullException(nameof(categoryEmployeeService));
        }

        // GET: api/categoryemployees/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CategoryEmployee>>> GetAllCategoryEmployees()
        {
            try
            {
                var categoryEmployees = await _service.GetAllAsync();

                var data = categoryEmployees.Select(r => new
                {
                    CategoryEmployeeId = r.CategoryEmployeeId,
                    EmployeeName = r.Employee.FullName,
                    CategoryName = r.Category.CategoryName
                });

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/categoryemployees/GetByCategoryId/{categoryId}
        [Authorize]
        [HttpGet("GetByCategoryId/{categoryId}")]
        public async Task<ActionResult<IEnumerable<CategoryEmployee>>> GetCategoryEmployeesByCategoryId(string categoryId)
        {
            try
            {
                var categoryEmployees = await _service.GetByCategoryIdAsync(categoryId);

                if (categoryEmployees == null || categoryEmployees.Count == 0)
                    return NotFound($"No category employees found for Category ID = {categoryId}.");

                return Ok(categoryEmployees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/categoryemployees/GetByEmployeeId/{employeeId}
        [Authorize]
        [HttpGet("GetByEmployeeId/{employeeId}")]
        public async Task<ActionResult<IEnumerable<CategoryEmployee>>> GetCategoryEmployeesByEmployeeId(string employeeId)
        {
            try
            {
                var categoryEmployees = await _service.GetByEmployeeIdAsync(employeeId);

                if (categoryEmployees == null || categoryEmployees.Count == 0)
                    return NotFound($"No category employees found for Employee ID = {employeeId}.");

                return Ok(categoryEmployees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/categoryemployees/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCategoryEmployee([FromBody] dynamic request)
        {
            try
            {

                var jsonElement = (JsonElement)request;

                string categoryId = jsonElement.GetProperty("categoryId").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();

                if (string.IsNullOrEmpty(categoryId) || string.IsNullOrEmpty(employeeId))
                    return BadRequest(new { msg = "CategoryEmployee details are incomplete." });

                var checkExist = await _service.GetByCategoryIdAndEmployeeId(categoryId, employeeId);
                if(checkExist == true)
                {
                    return BadRequest(new { msg = "CategoryEmployee is exist." });

                }
                var categoryEmployee = new CategoryEmployee
                {
                    CategoryEmployeeId = Guid.NewGuid().ToString("N"),
                    CategoryId = categoryId,
                    EmployeeId = employeeId
                };
                var isCreated = await _service.AddAsync(categoryEmployee);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the category employee." });

                return Ok(new { msg = "CategoryEmployee created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        // DELETE: api/categoryemployees/Delete/{categoryId}/{employeeId}
        [Authorize]
        [HttpDelete("Delete/{categoryId}/{employeeId}")]
        public async Task<ActionResult> DeleteCategoryEmployee(string categoryId, string employeeId)
        {
            try
            {
                var isDeleted = await _service.DeleteAsync(categoryId, employeeId);

                if (!isDeleted)
                    return NotFound(new { msg = $"CategoryEmployee with Category ID = {categoryId} and Employee ID = {employeeId} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("GetTotalCategoryEmployee")]
        public async Task<ActionResult> GetTotalCategoryEmployee()
        {
            var total = await _service.GetTotalCategoryEmployee();
            return Ok($"Total Category Employee: {total}");
        }
    }
}