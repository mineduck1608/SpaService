using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult> CreateEmployee([FromBody] Employee employee)
        {
            if (employee == null ||
                string.IsNullOrEmpty(employee.FullName) ||
                string.IsNullOrEmpty(employee.Position) ||
                string.IsNullOrEmpty(employee.Status) ||
                string.IsNullOrEmpty(employee.Image) ||
                string.IsNullOrEmpty(employee.AccountId))
            {
                return BadRequest("Employee details are incomplete or invalid.");
            }

            employee.EmployeeId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.AddEmployee(employee);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the employee.");

                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/employees/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateEmployee(string id, [FromBody] Employee employee)
        {
            if (employee == null ||
                string.IsNullOrEmpty(employee.FullName) ||
                string.IsNullOrEmpty(employee.Position) ||
                string.IsNullOrEmpty(employee.Status) ||
                string.IsNullOrEmpty(employee.Image) ||
                string.IsNullOrEmpty(employee.AccountId))
            {
                return BadRequest("Employee details are incomplete or invalid.");
            }

            employee.EmployeeId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.UpdateEmployee(id, employee);

                if (!isUpdated)
                    return NotFound($"Employee with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/employees/Delete/{id}
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
    }
}
