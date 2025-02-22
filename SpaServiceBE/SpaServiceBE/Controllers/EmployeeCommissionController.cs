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
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
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
        public async Task<ActionResult> CreateEmployeeCommission([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                string commissionId = jsonElement.GetProperty("commissionId").GetString();
                string transactionId = jsonElement.GetProperty("transactionId").GetString();
                float commissionValue = jsonElement.GetProperty("commissionValue").GetSingle();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(commissionId) ||
                    string.IsNullOrEmpty(transactionId) || commissionValue <= 0)
                {
                    return BadRequest(new { msg = "EmployeeCommission details are incomplete or invalid." });
                }

                // Tạo đối tượng EmployeeCommission
                var employeeCommission = new EmployeeCommission
                {
                    EmployeeId = employeeId,
                    CommissionId = commissionId,
                    TransactionId = transactionId,
                    CommissionValue = commissionValue
                };

                // Gọi service để thêm EmployeeCommission
                var isCreated = await _service.AddEmployeeCommission(employeeCommission);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the employee commission." });

                return CreatedAtAction(nameof(GetEmployeeCommissionById),
                    new { employeeId = employeeCommission.EmployeeId, commissionId = employeeCommission.CommissionId, transactionId = employeeCommission.TransactionId },
                    employeeCommission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/employeecommissions/Update/{employeeId}/{commissionId}/{transactionId}
        [Authorize(Roles = "Admin")]
        [HttpPut("Update/{employeeId}/{commissionId}/{transactionId}")]
        public async Task<ActionResult> UpdateEmployeeCommission(string employeeId, string commissionId, string transactionId, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string requestEmployeeId = jsonElement.GetProperty("employeeId").GetString();
                string requestCommissionId = jsonElement.GetProperty("commissionId").GetString();
                string requestTransactionId = jsonElement.GetProperty("transactionId").GetString();
                float commissionValue = jsonElement.GetProperty("commissionValue").GetSingle();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(requestEmployeeId) || string.IsNullOrEmpty(requestCommissionId) ||
                    string.IsNullOrEmpty(requestTransactionId) || commissionValue <= 0)
                {
                    return BadRequest(new { msg = "EmployeeCommission details are incomplete or invalid." });
                }

                // Ensure that the provided keys match the employeeCommission object
                if (requestEmployeeId != employeeId || requestCommissionId != commissionId || requestTransactionId != transactionId)
                {
                    return BadRequest(new { msg = "Provided IDs do not match the data." });
                }

                // Tạo đối tượng EmployeeCommission và gán ID cho update
                var employeeCommission = new EmployeeCommission
                {
                    EmployeeId = employeeId,
                    CommissionId = commissionId,
                    TransactionId = transactionId,
                    CommissionValue = commissionValue
                };

                // Gọi service để cập nhật EmployeeCommission
                var isUpdated = await _service.UpdateEmployeeCommission(employeeId, commissionId, transactionId, employeeCommission);

                if (!isUpdated)
                    return NotFound(new { msg = $"EmployeeCommission with EmployeeID = {employeeId}, CommissionID = {commissionId}, and TransactionID = {transactionId} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/employeecommissions/Delete/{employeeId}/{commissionId}/{transactionId}
        [Authorize(Roles = "Admin")]
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
