using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
                return NotFound("Username or password is incorrect.");
            }

            // Tạo Access Token
            var accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName);

            // Trả về Access Token
            return Ok(new
            {
                accessToken,
            });
        }




        // GET: api/accounts/GetAll
        [Authorize]
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

                var account = await _accountService.GetAccountById(id);

                if (account == null)
                    return NotFound($"Account with ID = {id} not found.");

                return Ok(account);
 

        }

        [HttpPost("RegisterEmployee")]
        public async Task<ActionResult> RegisterEmployee([FromBody] dynamic request)
        {
                var jsonElement = (JsonElement)request;

                // Extract account details
                string username = jsonElement.GetProperty("username").GetString();
                string password = jsonElement.GetProperty("password").GetString();

                // Extract employee details
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string position = jsonElement.GetProperty("position").GetString();
                string phone = jsonElement.GetProperty("phone").GetString();
                string email = jsonElement.GetProperty("email").GetString();
                DateTime hireDate = jsonElement.GetProperty("hireDate").GetDateTime();
                string status = jsonElement.GetProperty("status").GetString();
                string? image = jsonElement.TryGetProperty("image", out var imgProperty) ? imgProperty.GetString() : null;

                // Validate required fields
                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(fullName) ||
                    string.IsNullOrEmpty(position) || string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(email) ||
                    string.IsNullOrEmpty(hireDate.ToString()) || string.IsNullOrEmpty(status))
                    return BadRequest("Employee registration details are incomplete.");

                // Validate phone, email, and password formats
                if (!Util.IsPhoneFormatted(phone.Trim()))
                    return BadRequest(new { msg = "Phone number is not properly formatted" });

                if (!Util.IsMailFormatted(email))
                    return BadRequest(new { msg = "Email is not properly formatted" });

                if (!Util.IsPasswordSecure(password))
                    return BadRequest(new { msg = "Password is not secure enough" });

                // Check if the account already exists
                var existingAccount = await _accountService.GetAccountByUsername(username);
                if (existingAccount != null)
                    return Conflict("Username already exists.");

            var existingPhone = await _employeeService.GetEmployeeByPhone(phone);
            if (existingPhone != null)
                return Conflict("Phone is used.");

            var existingEmail = await _employeeService.GetEmployeeByEmail(email);
            if (existingEmail != null)
                return Conflict("Email is used.");

            // Create account object
            var account = new Account
                {
                    AccountId = Guid.NewGuid().ToString("N"),
                    Username = username,
                    Password = Util.ToHashString(password),
                    RoleId = "employeeRoleIdHere", // Replace with your Employee Role ID
                    Status = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                // Create employee object
                var employee = new Employee
                {
                    EmployeeId = Guid.NewGuid().ToString("N"),
                    AccountId = account.AccountId,
                    FullName = fullName,
                    Position = position,
                    HireDate = hireDate,
                    Status = status,
                    Phone = phone,
                    Email = email,
                    Image = image ?? string.Empty // Set to empty string if no image is provided
                };

                // Ensure both objects are not null
                if (account == null || employee == null)
                    return StatusCode(500, "Account or Employee object is null.");

                // Save account
                var isAccountCreated = await _accountService.AddAccount(account);
                if (!isAccountCreated)
                    return StatusCode(500, "An error occurred while creating the account.");

                // Save employee
                var isEmployeeCreated = await _employeeService.AddEmployee(employee);
                if (!isEmployeeCreated)
                    return StatusCode(500, "An error occurred while registering the employee.");

                return Ok(new { msg = "Employee registered successfully." });
            
        }


        [HttpPost("RegisterCustomer")]
        public async Task<ActionResult> Register([FromBody] dynamic request)
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

                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(gender) || string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(dateOfBirth.ToString()))
                    return BadRequest("Account details are incomplete.");

                if (!Util.IsPhoneFormatted(phone.Trim()))
                    return BadRequest(new { msg = "Phone number is not properly formatted" });

                if (!Util.IsMailFormatted(email))
                    return BadRequest(new { msg = "Email is not properly formatted" });
                if (!Util.IsPasswordSecure(password))
                    return BadRequest(new { msg = "Password is not secure enough" });

                // Kiểm tra tài khoản đã tồn tại
                var existingAccount = await _accountService.GetAccountByUsername(username);
                if (existingAccount != null)
                    return Conflict("Username already exists.");

                var existingPhone = await _customerService.GetCustomerByPhone(phone);
                if (existingPhone != null)
                return Conflict("Phone is used.");

            var existingEmail = await _customerService.GetCustomerByEmail(email);
            if (existingEmail != null)
                return Conflict("Email is used.");

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


                if (customer == null || account == null)
                {
                    return StatusCode(500, "Customer or Account is null.");
                }
                // Lưu tài khoản
                var isAccountCreated = await _accountService.AddAccount(account);
                if (!isAccountCreated)
                    return StatusCode(500, "An error occurred while registering the account.");



                // Lưu khách hàng
                var isCustomerCreated = await _customerService.AddCustomer(customer);
                if (!isCustomerCreated)
                    return StatusCode(500, "An error occurred while registering the customer.");

                return Ok(new { msg = "Register successfully." });
         
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
