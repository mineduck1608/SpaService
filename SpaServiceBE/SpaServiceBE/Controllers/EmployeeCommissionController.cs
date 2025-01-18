using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/employeecommissions")]
    [ApiController]
    public class EmployeeCommissionController : ControllerBase
    {
        private readonly IEmployeeCommissionService _service;

        public EmployeeCommissionController(IEmployeeCommissionService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/employeecommissions/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeCommission>>> GetAllEmployeeCommissions()
        {
            try
            {
                var employeeCommissions = await _service.GetAllEmployeeCommissions();
                return Ok(employeeCommissions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/employeecommissions/GetById/{employeeId}/{commissionId}/{transactionId}
        [HttpGet("GetById/{employeeId}/{commissionId}/{transactionId}")]
        public async Task<ActionResult<EmployeeCommission>> GetEmployeeCommissionById(string employeeId, string commissionId, string transactionId)
        {
            if (string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(commissionId) || string.IsNullOrEmpty(transactionId))
                return BadRequest("EmployeeId, CommissionId, and TransactionId are required.");

            try
            {
                var employeeCommission = await _service.GetEmployeeCommissionById(employeeId, commissionId, transactionId);

                if (employeeCommission == null)
                    return NotFound($"EmployeeCommission with EmployeeID = {employeeId}, CommissionID = {commissionId}, and TransactionID = {transactionId} not found.");

                return Ok(employeeCommission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/employeecommissions/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateEmployeeCommission([FromBody] EmployeeCommission employeeCommission)
        {
            if (employeeCommission == null ||
                string.IsNullOrEmpty(employeeCommission.EmployeeId) ||
                string.IsNullOrEmpty(employeeCommission.CommissionId) ||
                string.IsNullOrEmpty(employeeCommission.TransactionId) ||
                employeeCommission.CommissionValue <= 0)
            {
                return BadRequest("EmployeeCommission details are incomplete or invalid.");
            }

            try
            {
                var isCreated = await _service.AddEmployeeCommission(employeeCommission);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the employee commission.");

                return CreatedAtAction(nameof(GetEmployeeCommissionById),
                    new { employeeId = employeeCommission.EmployeeId, commissionId = employeeCommission.CommissionId, transactionId = employeeCommission.TransactionId },
                    employeeCommission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/employeecommissions/Update/{employeeId}/{commissionId}/{transactionId}
        [HttpPut("Update/{employeeId}/{commissionId}/{transactionId}")]
        public async Task<ActionResult> UpdateEmployeeCommission(string employeeId, string commissionId, string transactionId, [FromBody] EmployeeCommission employeeCommission)
        {
            if (employeeCommission == null ||
                string.IsNullOrEmpty(employeeCommission.EmployeeId) ||
                string.IsNullOrEmpty(employeeCommission.CommissionId) ||
                string.IsNullOrEmpty(employeeCommission.TransactionId) ||
                employeeCommission.CommissionValue <= 0)
            {
                return BadRequest("EmployeeCommission details are incomplete or invalid.");
            }

            // Ensure that the provided keys match the employeeCommission object
            employeeCommission.EmployeeId = employeeId;
            employeeCommission.CommissionId = commissionId;
            employeeCommission.TransactionId = transactionId;

            try
            {
                var isUpdated = await _service.UpdateEmployeeCommission(employeeId, commissionId, transactionId, employeeCommission);

                if (!isUpdated)
                    return NotFound($"EmployeeCommission with EmployeeID = {employeeId}, CommissionID = {commissionId}, and TransactionID = {transactionId} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/employeecommissions/Delete/{employeeId}/{commissionId}/{transactionId}
        [HttpDelete("Delete/{employeeId}/{commissionId}/{transactionId}")]
        public async Task<ActionResult> DeleteEmployeeCommission(string employeeId, string commissionId, string transactionId)
        {
            if (string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(commissionId) || string.IsNullOrEmpty(transactionId))
                return BadRequest("EmployeeId, CommissionId, and TransactionId are required.");

            try
            {
                var isDeleted = await _service.DeleteEmployeeCommission(employeeId, commissionId, transactionId);

                if (!isDeleted)
                    return NotFound($"EmployeeCommission with EmployeeID = {employeeId}, CommissionID = {commissionId}, and TransactionID = {transactionId} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
