using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _service;

        public CustomerController(ICustomerService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/customers/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAllCustomers()
        {
            try
            {
                var customers = await _service.GetAllCustomers();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/customers/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Customer>> GetCustomerById(string id)
        {
            try
            {
                var customer = await _service.GetCustomerById(id);

                if (customer == null)
                    return NotFound($"Customer with ID = {id} not found.");

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/customers/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCustomer([FromBody] Customer customer)
        {
            if (customer == null || string.IsNullOrEmpty(customer.FullName) || string.IsNullOrEmpty(customer.Phone) || string.IsNullOrEmpty(customer.Email))
                return BadRequest("Customer details are incomplete or invalid.");

            customer.CustomerId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.AddCustomer(customer);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the customer.");

                return CreatedAtAction(nameof(GetCustomerById), new { id = customer.CustomerId }, customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/customers/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCustomer(string id, [FromBody] Customer customer)
        {
            if (customer == null || string.IsNullOrEmpty(customer.FullName) || string.IsNullOrEmpty(customer.Phone) || string.IsNullOrEmpty(customer.Email))
                return BadRequest("Customer details are incomplete or invalid.");

            customer.CustomerId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.UpdateCustomer(id, customer);

                if (!isUpdated)
                    return NotFound($"Customer with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/customers/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCustomer(string id)
        {
            try
            {
                var isDeleted = await _service.DeleteCustomer(id);

                if (!isDeleted)
                    return NotFound($"Customer with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
