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
    [Route("accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ICustomerService _customerService;
        private readonly IRoleService _roleService;
        private readonly IEmployeeService _employeeService;
        private readonly IManagerService _managerService;

        public AccountController(
    IAccountService accountService,
    ICustomerService customerService,
    IRoleService roleService,
    IEmployeeService employeeService,
    IManagerService managerService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
            _customerService = customerService ?? throw new ArgumentNullException(nameof(customerService));
            _roleService = roleService ?? throw new ArgumentNullException(nameof(roleService));
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
            _managerService = managerService ?? throw new ArgumentNullException(nameof(managerService));
        }


        [HttpGet("GetByAccountId/{id}")]
        public async Task<ActionResult> GetByAccountId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("Id is required.");

            try
            {
                var account = await _accountService.GetAccountById(id);

                if (account == null)
                {
                    return BadRequest("Account is not existed.");
                }

                if (account.Role.RoleName == "Admin")
                {
                    var result = new
                    {
                        FullName = "Admin",
                    };
                    return Ok(result);
                }
                var managerName = await _managerService.GetManagerByAccountId(account.AccountId);
                var resultManager = new
                {
                    FullName = managerName.FullName,
                };

                return Ok(resultManager);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
                return NotFound(new {msg = "Username or password is incorrect." });
            }
            //check status of the account
            if (!account.Status)
            {
                return BadRequest(new {msg = "Your account had been deactivated !" });
            } 
            var accessToken = string.Empty;
            if(account.Role.RoleName == "Customer")
            {
                var customer = await _customerService.GetCustomerByAccountId(account.AccountId);
                accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName, customer.FullName);
                return Ok(new
                {
                    accessToken,
                });

            }

            if (account.Role.RoleName == "Admin")
            {
                accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName, "Admin");
                return Ok(new
                {
                    accessToken,
                });

            }

            if(account.Role.RoleName == "Employee") { 
            var employee = await _employeeService.GetEmployeeByAccountId(account.AccountId);
            accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName, employee.FullName);
            return Ok(new
            {
                accessToken,
            });
            }

            if (account.Role.RoleName == "Manager")
            {
                var manager = await _managerService.GetManagerByAccountId(account.AccountId);
                accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName, manager.FullName);
                return Ok(new
                {
                    accessToken,
                });
            }
            return NotFound();
        }


        [HttpPost("hash")]
        public async Task<ActionResult<object>> Hash(string pass)
        {
            // Mã hóa mật khẩu
            string password = Util.ToHashString(pass);

            // Lấy thông tin tài khoản
           
            return Ok(new
            {
                password
            });
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
                string? image = jsonElement.TryGetProperty("image", out var imgProperty) ? imgProperty.GetString() : null;

                // Validate required fields
                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(fullName) ||
                    string.IsNullOrEmpty(position) || string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(email))
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
                    RoleId = "6219a63fab414127aa8ac13f2a3eb2a4", // Replace with your Employee Role ID
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
                    HireDate = DateOnly.FromDateTime(DateTime.Now),
                    Status = "Working",
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

        [HttpPost("RegisterManager")]
        public async Task<ActionResult> RegisterManager([FromBody] dynamic request)
        {
            var jsonElement = (JsonElement)request;

            // Extract account details
            string username = jsonElement.GetProperty("username").GetString();
            string password = jsonElement.GetProperty("password").GetString();
            // Extract manager details
            string fullName = jsonElement.GetProperty("fullName").GetString();
            string position = jsonElement.GetProperty("position").GetString();
            string phone = jsonElement.GetProperty("phone").GetString();
            string email = jsonElement.GetProperty("email").GetString();
            string? image = jsonElement.TryGetProperty("image", out var imgProperty) ? imgProperty.GetString() : null;

            // Validate required fields
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(fullName) ||
                string.IsNullOrEmpty(position) || string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(email))
                return BadRequest("Manager registration details are incomplete.");

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

            var existingPhone = await _managerService.GetManagerByPhone(phone);
            if (existingPhone != null)
                return Conflict("Phone is used.");

            var existingEmail = await _managerService.GetManagerByEmail(email);
            if (existingEmail != null)
                return Conflict("Email is used.");

            // Create account object
            var account = new Account
            {
                AccountId = Guid.NewGuid().ToString("N"),
                Username = username,
                Password = Util.ToHashString(password),
                RoleId = "70061484c29840fbb22ca3f6b3203e39", // Replace with your Employee Role ID
                Status = true,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            // Create manager object
            var manager = new Manager
            {
                ManagerId = Guid.NewGuid().ToString("N"),
                AccountId = account.AccountId,
                FullName = fullName,
                Position = position,
                HireDate = DateOnly.FromDateTime(DateTime.Now),
                Status = "Working",
                Phone = phone,
                Email = email,
                Image = image ?? string.Empty // Set to empty string if no image is provided
            };

            // Ensure both objects are not null
            if (account == null || manager == null)
                return StatusCode(500, "Account or Manager object is null.");

            // Save account
            var isAccountCreated = await _accountService.AddAccount(account);
            if (!isAccountCreated)
                return StatusCode(500, "An error occurred while creating the account.");

            // Save manager
            var isManagerCreated = await _managerService.AddManager(manager);
            if (!isManagerCreated)
                return StatusCode(500, "An error occurred while registering the manager.");

            return Ok(new { msg = "Manager registered successfully." });

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
                    RoleId = "eed231e27e6c4309895ef17737569015",
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
                bool status = jsonElement.GetProperty("status").GetBoolean();

                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(roleId))
                    return BadRequest("Account details are incomplete.");

                var account = new Account
                {
                    AccountId = id,
                    Username = username,
                    Password = Util.ToHashString(password),
                    RoleId = roleId,
                    UpdatedAt = DateTime.Now,
                    Status = status
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


        [HttpDelete("Test/{id}")]
        public async Task<ActionResult> Test(string id)
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
