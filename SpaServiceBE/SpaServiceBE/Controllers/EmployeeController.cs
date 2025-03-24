using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _service;
        private readonly IAccountService _accountService;
        public EmployeeController(IEmployeeService service, IAccountService accountService)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }


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
                string? phone = jsonElement.GetProperty("phone").GetString();
                string? email = jsonElement.GetProperty("email").GetString();
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
                    AccountId = accountId,
                    Phone = phone,
                    Email = email,
                };

                // Gọi service để thêm employee
                var isCreated = await _service.AddEmployee(employee);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the employee." });

                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, new { employeeId = employee.EmployeeId });
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
                string? phone = jsonElement.GetProperty("phone").GetString();
                string? email = jsonElement.GetProperty("email").GetString();
                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(position) ||
                    string.IsNullOrEmpty(status) || string.IsNullOrEmpty(image) ||
                    string.IsNullOrEmpty(accountId)|| string.IsNullOrEmpty(phone)
                    || string.IsNullOrEmpty(email))
                {
                    return BadRequest(new { msg = "Employee details are incomplete or invalid." });
                }
                //get account info
                var account = await _accountService.GetAccountById(accountId);
                if (account == null) {
                    return BadRequest(new { msg = "Account is not avaliable." }); 
                }
                //check if account is Retired or not
                if (status == "Retired")
                {
                    account.Status = false;
                }
                else
                {
                    account.Status = true;
                }
                // Update Account
                await _accountService.UpdateAccount(account, account.AccountId); 
                // Tạo đối tượng Employee và gán ID cho update
                var employee = new Employee
                {
                    EmployeeId = id, // Use the provided ID for the update
                    FullName = fullName,
                    Position = position,
                    Status = status,
                    Image = image,
                    AccountId = accountId,
                    Phone = phone,
                    Email = email
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

        [HttpGet("GetEmployeeByAccountId/{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeByAccountId(string id)
        {
            try
            {
                var employees = await _service.GetEmployeeByAccountId(id);

                if (employees == null)
                    return NotFound($"No employees found.");

                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
