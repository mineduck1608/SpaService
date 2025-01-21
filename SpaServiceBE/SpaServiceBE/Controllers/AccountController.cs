using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using SpaServiceBE.Utils;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ICustomerService _customerService;
        private readonly IRoleService _roleService;
        private readonly IEmployeeService _employeeService;

        public AccountController(
    IAccountService accountService,
    ICustomerService customerService,
    IRoleService roleService,
    IEmployeeService employeeService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
            _customerService = customerService ?? throw new ArgumentNullException(nameof(customerService));
            _roleService = roleService ?? throw new ArgumentNullException(nameof(roleService));
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
        }


        [HttpPost("Login")]
        public async Task<ActionResult<object>> Login([FromBody] object request)
        {
            try
            {
                // Chuyển đổi request sang JsonElement
                var jsonElement = (JsonElement)request;

                // Lấy username và password từ JSON request
                string username = jsonElement.GetProperty("username").GetString();
                string password = jsonElement.GetProperty("password").GetString();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                {
                    return BadRequest("Username and password are required.");
                }

                // Mã hóa mật khẩu
                password = Util.ToHashString(password);

                // Lấy thông tin tài khoản
                var account = await _accountService.GetAccountByLogin(username, password);

                if (account == null)
                {
                    return NotFound("Account not found.");
                }

                // Tạo Access Token
                var accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName);

                // Trả về Access Token
                return Ok(new
                {
                    accessToken,
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest($"Missing property: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        // GET: api/accounts/GetAll
        [HttpGet("GetAll")]
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
        [HttpGet("GetById/{id}")]
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
        [HttpPost("Create")]
        public async Task<ActionResult> CreateAccount([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string username = jsonElement.GetProperty("username").GetString();
                string password = jsonElement.GetProperty("password").GetString();
                string roleId = jsonElement.GetProperty("roleId").GetString();

                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(roleId))
                    return BadRequest("Account details are incomplete.");

                var account = new Account
                {
                    AccountId = Guid.NewGuid().ToString("N"),
                    Username = username,
                    Password = Util.ToHashString(password),
                    RoleId = roleId,
                    Status = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                var existingAccount = await _accountService.GetAccountByUsername(username);
                if (existingAccount != null)
                    return Conflict("Username already exists.");

                var isCreated = await _accountService.AddAccount(account);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the account.");

                return Ok("CreateAccount successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy thông tin tài khoản
                string username = jsonElement.GetProperty("username").GetString();
                string password = jsonElement.GetProperty("password").GetString();

                // Lấy thông tin khách hàng
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string gender = jsonElement.GetProperty("gender").GetString();
                string phone = jsonElement.GetProperty("phone").GetString();
                string email = jsonElement.GetProperty("email").GetString();
                DateTime dateOfBirth = jsonElement.GetProperty("dateOfBirth").GetDateTime();

                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                    return BadRequest("Account details are incomplete.");

                // Kiểm tra tài khoản đã tồn tại
                var existingAccount = await _accountService.GetAccountByUsername(username);
                if (existingAccount != null)
                    return Conflict("Username already exists.");

                // Tạo đối tượng tài khoản
                var account = new Account
                {
                    AccountId = Guid.NewGuid().ToString("N"),
                    Username = username,
                    Password = Util.ToHashString(password),
                    RoleId = "d0940b4b8f7040b1a59c227adeae520d",
                    Status = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                // Lưu tài khoản
                var isAccountCreated = await _accountService.AddAccount(account);
                if (!isAccountCreated)
                    return StatusCode(500, "An error occurred while registering the account.");

                // Tạo đối tượng khách hàng
                var customer = new Customer
                {
                    CustomerId = Guid.NewGuid().ToString("N"),
                    AccountId = account.AccountId,
                    FullName = fullName,
                    Gender = gender,
                    Phone = phone,
                    Email = email,
                    DateOfBirth = dateOfBirth,
                    MembershipId = null // Mặc định chưa có membership
                };

                // Lưu khách hàng
                var isCustomerCreated = await _customerService.AddCustomer(customer);
                if (!isCustomerCreated)
                    return StatusCode(500, "An error occurred while registering the customer.");

                return Ok("Register successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // PUT: api/accounts/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateAccount(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string username = jsonElement.GetProperty("username").GetString();
                string password = jsonElement.GetProperty("password").GetString();
                string roleId = jsonElement.GetProperty("roleId").GetString();

                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(roleId))
                    return BadRequest("Account details are incomplete.");

                var account = new Account
                {
                    AccountId = id,
                    Username = username,
                    Password = Util.ToHashString(password),
                    RoleId = roleId,
                    UpdatedAt = DateTime.Now
                };

                var isUpdated = await _accountService.UpdateAccount(account, id);

                if (!isUpdated)
                    return NotFound($"Account with ID = {id} not found.");

                return Ok("UpdateAccount successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/accounts/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteAccount(string id)
        {
            try
            {
                var isDeleted = await _accountService.DeleteAccount(id);

                if (!isDeleted)
                    return NotFound($"Account with ID = {id} not found.");

                return Ok("DeleteAccount successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
