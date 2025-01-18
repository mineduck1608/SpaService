using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/accounts")] // Định tuyến gốc cho controller
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        // GET: api/accounts/GetAll
        [HttpGet("GetAll")] // Đường dẫn cụ thể cho lấy danh sách tài khoản
        public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts()
        {
            try
            {
                var accounts = await _accountService.GetAllAccounts();
                return Ok(accounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/accounts/GetById/{id}
        [HttpGet("GetById/{id}")] // Đường dẫn cụ thể cho lấy tài khoản theo ID
        public async Task<ActionResult<Account>> GetAccountById(string id)
        {
            try
            {
                var account = await _accountService.GetAccountById(id);

                if (account == null)
                    return NotFound($"Account with ID = {id} not found.");

                return Ok(account);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/accounts/Create
        [HttpPost("Create")] // Đường dẫn cụ thể cho tạo tài khoản mới
        public async Task<ActionResult> CreateAccount([FromBody] Account account)
        {
            if (account == null || string.IsNullOrEmpty(account.Username) || string.IsNullOrEmpty(account.Password) || string.IsNullOrEmpty(account.RoleId))
                return BadRequest("Account details are incomplete.");

            account.Status = true; // Mặc định trạng thái là active
            account.CreatedAt = DateTime.UtcNow; // Thời gian tạo tài khoản

            try
            {
                var isCreated = await _accountService.AddAccount(account);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the account.");

                return CreatedAtRoute("GetById", new { id = account.AccountId }, account);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/accounts/Update/{id}
        [HttpPut("Update/{id}")] // Đường dẫn cụ thể cho cập nhật tài khoản
        public async Task<ActionResult> UpdateAccount(string id, [FromBody] Account account)
        {
            if (account == null || string.IsNullOrEmpty(account.Username) || string.IsNullOrEmpty(account.Password) || string.IsNullOrEmpty(account.RoleId))
                return BadRequest("Account details are incomplete.");

            account.AccountId = id; // Gán ID tài khoản cần cập nhật

            try
            {
                var isUpdated = await _accountService.UpdateAccount(account, id);

                if (!isUpdated)
                    return NotFound($"Account with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/accounts/Delete/{id}
        [HttpDelete("Delete/{id}")] // Đường dẫn cụ thể cho xóa tài khoản
        public async Task<ActionResult> DeleteAccount(string id)
        {
            try
            {
                var isDeleted = await _accountService.DeleteAccount(id);

                if (!isDeleted)
                    return NotFound($"Account with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
