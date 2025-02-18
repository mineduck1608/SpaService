using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeeController(IEmployeeService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/employees/GetAll
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            try
            {
                var employees = await _service.GetAllEmployees();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/employees/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("EmployeeId is required.");

            try
            {
                var employee = await _service.GetEmployeeById(id);

                if (employee == null)
                    return NotFound($"Employee with ID = {id} not found.");

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/employees/Create
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateEmployee([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string position = jsonElement.GetProperty("position").GetString();
                string status = jsonElement.GetProperty("status").GetString();
                string image = jsonElement.GetProperty("image").GetString();
                string accountId = jsonElement.GetProperty("accountId").GetString();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(position) ||
                    string.IsNullOrEmpty(status) || string.IsNullOrEmpty(image) ||
                    string.IsNullOrEmpty(accountId))
                {
                    return BadRequest(new { msg = "Employee details are incomplete or invalid." });
                }

                // Tạo đối tượng Employee
                var employee = new Employee
                {
                    EmployeeId = Guid.NewGuid().ToString(), // Generate unique ID
                    FullName = fullName,
                    Position = position,
                    Status = status,
                    Image = image,
                    AccountId = accountId
                };

                // Gọi service để thêm employee
                var isCreated = await _service.AddEmployee(employee);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the employee." });

                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/employees/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateEmployee(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string position = jsonElement.GetProperty("position").GetString();
                string status = jsonElement.GetProperty("status").GetString();
                string image = jsonElement.GetProperty("image").GetString();
                string accountId = jsonElement.GetProperty("accountId").GetString();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(position) ||
                    string.IsNullOrEmpty(status) || string.IsNullOrEmpty(image) ||
                    string.IsNullOrEmpty(accountId))
                {
                    return BadRequest(new { msg = "Employee details are incomplete or invalid." });
                }

                // Tạo đối tượng Employee và gán ID cho update
                var employee = new Employee
                {
                    EmployeeId = id, // Use the provided ID for the update
                    FullName = fullName,
                    Position = position,
                    Status = status,
                    Image = image,
                    AccountId = accountId
                };

                // Gọi service để cập nhật employee
                var isUpdated = await _service.UpdateEmployee(id, employee);

                if (!isUpdated)
                    return NotFound(new { msg = $"Employee with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/employees/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteEmployee(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("EmployeeId is required.");

            try
            {
                var isDeleted = await _service.DeleteEmployee(id);

                if (!isDeleted)
                    return NotFound($"Employee with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // API lấy danh sách nhân viên theo CategoryId
        [HttpGet("GetEmployeeByCategoryId/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeByCategoryId(string categoryId)
        {
            try
            {
                var employees = await _service.GetEmployeesByCategoryIdAsync(categoryId);

                if (employees == null || employees.Count == 0)
                    return NotFound($"No employees found for Category ID = {categoryId}.");

                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
