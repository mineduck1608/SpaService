using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using System;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Context;
using Repositories.Entities;
using SpaServiceBE.Utils;
using Microsoft.EntityFrameworkCore;

namespace SpaServiceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleAuthController : ControllerBase
    {
        private readonly SpaserviceContext _context;

        public GoogleAuthController(SpaserviceContext context)
        {
            _context = context;
        }

        [HttpPost("decode-and-check-or-create")]
        public async Task<IActionResult> DecodeAndCheckOrCreateUser([FromBody] TokenRequest request)
        {
            try
            {
                // Validate and decode the token
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token);

                // Extract user information from the payload
                var email = payload.Email;
                var name = payload.Name;

                // Now, call the check-or-create logic with extracted email and name
                if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(name))
                {
                    return BadRequest(new { error = "Name and email are required." });
                }

                // Check in Employees table first
                var employee = _context.Employees.FirstOrDefault(e => e.Email == email);
                if (employee != null)
                {
                    var account = _context.Accounts.Include(r => r.Role).FirstOrDefault(a => a.AccountId == employee.AccountId);
                     // Generate access token
                var accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName, employee.FullName);

                    return Ok(new
                    {
                    
                        accessToken
                    });
                }

                // Check in Customers table if not found in Employees
                var customer = _context.Customers.FirstOrDefault(c => c.Email == email);
                if (customer != null)
                {
                    var account = _context.Accounts
                        .Include(a => a.Role) // Ensure Role is loaded
                        .FirstOrDefault(a => a.AccountId == customer.AccountId);

                    if (account != null && account.Role != null)
                    {
                        var accessToken = Util.GenerateToken(account.AccountId, account.Username, account.Role.RoleName, customer.FullName);
                        return Ok(new
                        {
                         
                            accessToken
                        });
                    }

                    return BadRequest(new { error = "Account not found or incomplete" });
                }

                // If no record is found, create a new Account and Customer
                var newAccount = new Account
                {
                    AccountId = Guid.NewGuid().ToString("N"),
                    Username = name, // Use email as the username
                    Password = "GoogleAuth", // null
                    Status = true,
                    CreatedAt = DateTime.UtcNow,
                    RoleId = "eed231e27e6c4309895ef17737569015" // Customer role ID
                };

                var newCustomer = new Customer
                {
                    CustomerId = Guid.NewGuid().ToString("N"),
                    FullName = name,
                    Email = email,
                    Phone = "None",
                    DateOfBirth = DateTime.UtcNow, // Set appropriately or make nullable
                    AccountId = newAccount.AccountId,
                    Gender = "Other",
                };

                _context.Accounts.Add(newAccount);
                await _context.SaveChangesAsync(); // Check if this works first

                _context.Customers.Add(newCustomer);
                await _context.SaveChangesAsync();


                // Generate access token for the newly created account
                var newAccessToken = Util.GenerateToken(newAccount.AccountId, newAccount.Username, "Customer", newCustomer.FullName);

                return Ok(new
                {
                    accessToken = newAccessToken
                });
            }
            catch (Exception ex)
            {
                // Handle errors (e.g., invalid token)
                return BadRequest(new { error = ex.Message, details = ex.InnerException?.Message });
            }
        }
    }

    public class TokenRequest
    {
        public string Token { get; set; }
    }

    public class UserRequest
    {
        public string Email { get; set; }
        public string Name { get; set; }
    }
}
