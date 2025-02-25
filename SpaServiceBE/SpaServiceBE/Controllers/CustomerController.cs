﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
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
        [Authorize(Roles = "Admin, Manager")]
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
        public async Task<ActionResult> CreateCustomer([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string phone = jsonElement.GetProperty("phone").GetString();
                string email = jsonElement.GetProperty("email").GetString();

                // Validate input
                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(email))
                {
                    return BadRequest(new { msg = "Customer details are incomplete or invalid." });
                }

                // Create Customer object
                var customer = new Customer
                {
                    CustomerId = Guid.NewGuid().ToString(), // Generate unique ID
                    FullName = fullName,
                    Phone = phone,
                    Email = email
                };

                // Call service to add customer
                var isCreated = await _service.AddCustomer(customer);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the customer." });

                return CreatedAtAction(nameof(GetCustomerById), new { id = customer.CustomerId }, customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/customers/Update/{id}
        [Authorize(Roles = "Admin, Customer")]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCustomer(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string fullName = jsonElement.GetProperty("fullName").GetString();
                string phone = jsonElement.GetProperty("phone").GetString();
                string email = jsonElement.GetProperty("email").GetString();
                string gender = jsonElement.GetProperty("gender").GetString();
                DateTime dateOfBirth = jsonElement.GetProperty("dateOfBirth").GetDateTime();


                var customer = await _service.GetCustomerById(id);

                if(customer == null)
                {
                    return NotFound(new { msg = $"Customer with ID = {id} not found." });

                }

                if (!fullName.IsNullOrEmpty())
                {
                    customer.FullName = fullName;
                }
                if (!phone.IsNullOrEmpty())
                {
                    customer.Phone = phone;
                }
                if (!email.IsNullOrEmpty())
                {
                    customer.Email = email;
                }
                if (!gender.IsNullOrEmpty())
                {
                    customer.Gender = gender;
                }
                if (dateOfBirth != null)
                {
                    customer.DateOfBirth = dateOfBirth;
                }



                // Call service to update customer
                var isUpdated = await _service.UpdateCustomer(id, customer);

                if (!isUpdated)
                    return NotFound(new { msg = $"Customer with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        // DELETE: api/customers/Delete/{id}
        [Authorize(Roles = "Admin, Customer")]
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
        [HttpGet("GetByAccId")]
        [Authorize]
        public async Task<ActionResult> GetCustomerByAccId(string accId)
        {
            try
            {
                var customer = await _service.GetCustomerByAccId(accId);

                if (customer == null)
                    return NotFound($"Customer with account ID = {accId} not found.");

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
