using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using SpaServiceBE.Utils;
using System;
using System.Collections.Generic;
using System.Numerics;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _service;

        public ContactController(IContactService contactService)
        {
            _service = contactService ?? throw new ArgumentNullException(nameof(contactService));
        }

        // GET: api/contacts/GetAll
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetAllContacts()
        {
            try
            {
                var contacts = await _service.GetAllContacts();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/contacts/GetById/{id}
        [Authorize(Roles = "Admin, Manager")]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Contact>> GetContactById(string id)
        {
            try
            {
                var contact = await _service.GetContactById(id);

                if (contact == null)
                    return NotFound($"Contact with ID = {id} not found.");

                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/contacts/GetByPhone/{phone}
        [Authorize]
        [HttpGet("GetByPhone/{phone}")]
        public async Task<ActionResult<Contact>> GetContactByPhone(string phone)
        {
            try
            {
                var contact = await _service.GetContactByPhone(phone);

                if (contact == null)
                    return NotFound($"Contact with Phone = {phone} not found.");

                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/contacts/GetByEmail/{email}
        [Authorize]
        [HttpGet("GetByEmail/{email}")]
        public async Task<ActionResult<Contact>> GetContactByEmail(string email)
        {
            try
            {
                var contact = await _service.GetContactByEmail(email);

                if (contact == null)
                    return NotFound($"Contact with Email = {email} not found.");

                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/contacts/GetByFullName/{fullName}
        [Authorize]
        [HttpGet("GetByFullName/{fullName}")]
        public async Task<ActionResult<Contact>> GetContactByFullName(string fullName)
        {
            try
            {
                var contact = await _service.GetContactByFullName(fullName);

                if (contact == null)
                    return NotFound($"Contact with FullName = {fullName} not found.");

                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/contacts/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateContact([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string fullName = jsonElement.GetProperty("fullName").GetString();
                string phoneNumber = jsonElement.GetProperty("phoneNumber").GetString();
                string email = jsonElement.GetProperty("email").GetString();
                string contactContent = jsonElement.GetProperty("contactContent").GetString();

                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(email))
                    return BadRequest(new { msg = "Contact details are incomplete." });

                if (!Util.IsPhoneFormatted(phoneNumber.Trim()))
                    return BadRequest(new { msg = "Phone number is not properly formatted" });

                if (!Util.IsMailFormatted(email))
                    return BadRequest(new { msg = "Email is not properly formatted" });
                // Create contact object
                var contact = new Contact
                {
                    ContactId = Guid.NewGuid().ToString("N"),
                    FullName = fullName,
                    PhoneNumber = phoneNumber,
                    Email = email,
                    ContactContent = contactContent
                };

                var isCreated = await _service.AddContact(contact);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the contact." });

                return Ok(new { msg = "Contact created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        // DELETE: api/contacts/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteContact(string id)
        {
            try
            {
                var isDeleted = await _service.DeleteContact(id);

                if (!isDeleted)
                    return NotFound(new { msg = $"Contact with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
