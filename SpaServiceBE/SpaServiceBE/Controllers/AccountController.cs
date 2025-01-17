using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        // GET: api/account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts()
        {
            try
            {
                var accounts = await _accountService.GetAllAccountsAsync();
                return Ok(accounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/account/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccountById(string id)
        {
            try
            {
                var account = await _accountService.GetAccountByIdAsync(id);

                if (account == null)
                    return NotFound($"Account with ID = {id} not found.");

                return Ok(account);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/account
        [HttpPost]
        public async Task<ActionResult> CreateAccount( string accountId,  string username,  string password,  string roleId)
        {
            if (string.IsNullOrEmpty(accountId) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(roleId))
                return BadRequest("Account details are incomplete.");

            var account = new Account
            {
                AccountId = accountId,
                Username = username,
                Password = password,  // In a real-world scenario, remember to hash the password before saving.
                Status = true,  // Default status to active
                CreatedAt = DateTime.UtcNow,  // Set the account creation date
                RoleId = roleId
            };

            try
            {
                var isCreated = await _accountService.AddAccountAsync(account);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the account.");

                return CreatedAtAction(nameof(GetAccountById), new { id = account.AccountId }, account);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/account/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAccount(string id,  string username,  string password,  string roleId)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(roleId))
                return BadRequest("Account details are incomplete.");

            var account = new Account
            {
                AccountId = id,
                Username = username,
                Password = password,  // In a real-world scenario, remember to hash the password before updating.
                RoleId = roleId,
                Status = true,  // Default status to active
                CreatedAt = DateTime.UtcNow  // This can be omitted if you don't want to change the creation date
            };

            try
            {
                var isUpdated = await _accountService.UpdateAccountAsync(account, id);

                if (!isUpdated)
                    return NotFound($"Account with ID = {id} not found.");

                return NoContent();

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/account/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAccount(string id)
        {
            try
            {
                var isDeleted = await _accountService.DeleteAccountAsync(id);

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
