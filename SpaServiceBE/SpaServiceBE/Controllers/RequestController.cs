using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Utils;
using Microsoft.VisualBasic;


namespace API.Controllers
{
    [Route("api/requests")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _service;
        private readonly ICustomerService _customerService;
        private readonly IConfiguration _configuration;
        private readonly ISpaServiceService _paService;
        public RequestController(IRequestService service, ICustomerService customerService, IConfiguration configuration, ISpaServiceService paService)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _customerService = customerService ?? throw new ArgumentNullException(nameof(customerService));
            _configuration = configuration;
            _paService = paService ?? throw new ArgumentNullException(nameof(paService));
        }

        // GET: api/requests/GetAll
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Request>>> GetAllRequests()
        {
            try
            {
                var requests = await _service.GetAll();
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/requests/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Request>> GetRequestById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("RequestId is required.");

            try
            {
                var request = await _service.GetById(id);

                if (request == null)
                    return NotFound($"Request with ID = {id} not found.");

                return Ok(request);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/requests/Create
        
        [HttpPost("Create")]
        public async Task<ActionResult> CreateRequest([FromBody] dynamic request)
        {
            try
            {
                //lay json cho bao mat
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string customerId = jsonElement.GetProperty("customerId").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                string serviceId = jsonElement.GetProperty("serviceId").GetString();
                DateTime startTime = jsonElement.GetProperty("startTime").GetDateTime();
                string? customerNote = jsonElement.TryGetProperty("customerNote", out var customerNoteProp) ? customerNoteProp.GetString() : null;

                //get request info for duration 
                var SpaServiceInfo = await _paService.GetById(serviceId);
                if (SpaServiceInfo == null)
                    return BadRequest("Spa Service is missing.");

                //create endtime

                DateTime endTime= startTime.Add(SpaServiceInfo.Duration);
                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(serviceId) ||
                    startTime == default(DateTime))
                {
                    return BadRequest(new { msg = "Request details are incomplete or invalid." });
                }
                //handle Start time
                if (startTime < DateTime.Now.AddHours(1))
                {
                    return BadRequest(new { msg = "Start time must be at least 1 hour in the future." });
                }
                if (startTime > DateTime.Now.AddMonths(1))
                {
                    return BadRequest(new { msg = "The Start should be booked within 1 month." });
                }
                //handle duration
                if (endTime.Hour > 22 )
                {
                    return BadRequest(new { msg = "The duration can not last until 10PM or later" });
                }
                // Tạo đối tượng Request
                var newRequest = new Request
                {
                    RequestId = Guid.NewGuid().ToString(), // Generate unique ID
                    CustomerId = customerId,
                    ServiceId = serviceId,
                    StartTime = startTime,
                    Status = "PENDING",
                    CustomerNote = customerNote,
                    ManagerNote = null,
                    EmployeeId = employeeId,
                };

                // Gọi service để thêm request
                var isCreated = await _service.Add(newRequest);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the request." });

                return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.RequestId }, newRequest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // PUT: api/requests/Update/{id}
        [Authorize(Roles = "Admin, Customer")]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateRequest(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string customerId = jsonElement.GetProperty("customerId").GetString();
                string serviceId = jsonElement.GetProperty("serviceId").GetString();
                DateTime startTime = jsonElement.GetProperty("startTime").GetDateTime();
                string status = jsonElement.GetProperty("status").GetString();
                string? customerNote = jsonElement.TryGetProperty("customerNote", out var customerNoteProp) ? customerNoteProp.GetString() : null;
                string? managerNote = jsonElement.TryGetProperty("managerNote", out var managerNoteProp) ? managerNoteProp.GetString() : null;
                var SpaServiceInfo = await _paService.GetById(serviceId);
                if (SpaServiceInfo == null)
                    return BadRequest("Spa Service is missing.");

                //create endtime

                DateTime endTime = startTime.Add(SpaServiceInfo.Duration);
                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(serviceId) ||
                    startTime == default(DateTime) || string.IsNullOrEmpty(status))
                {
                    return BadRequest(new { msg = "Request details are incomplete or invalid." });
                }
                //handle Start time
                if (startTime < DateTime.Now.AddMinutes(15))
                {
                    return BadRequest(new { msg = "Start time must be at least 15 minutes in the future." });
                }
                if (startTime > DateTime.Now.AddMonths(1))
                {
                    return BadRequest(new { msg= "The Start should be booked 1 months early."});
                }
                if (startTime.Hour > 22 || startTime.Hour < 8)
                {
                    return BadRequest(new { msg = "Bookings can only be made between 8:00 AM and 10:00 PM." });
                }
                //handle duration
                if (endTime.Hour > 22)
                {
                    return BadRequest(new { msg = "The duration can not last until 10PM or later" });
                }

                // Tạo đối tượng Request và gán ID cho update
                var updatedRequest = new Request
                {
                    RequestId = id, // Assign the ID for the update
                    CustomerId = customerId,
                    ServiceId = serviceId,
                    StartTime = startTime,
                    Status = status,
                    CustomerNote = customerNote,
                    ManagerNote = managerNote
                };

                // Gọi service để cập nhật request
                var isUpdated = await _service.Update(id, updatedRequest);

                if (!isUpdated)
                    return NotFound(new { msg = $"Request with ID = {id} not found." });

                return Ok(new { msg = "Update request successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/requests/Delete/{id}
        [Authorize(Roles = "Admin, Customer")]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRequest(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("RequestId is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"Request with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("CreateMail/{id}")]
        public async Task<ActionResult> CreateEmailRequest(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("RequestId is needed.");
            }

            try
            {
                var request = await _service.GetById(id);
                if (request == null)
                    return NotFound($"Request with ID = {id} not found.");

                var customerInfo = await _customerService.GetCustomerById(request.CustomerId);
                if (customerInfo == null)
                    return NotFound($"Customer info with ID = {request.CustomerId} not found.");

                var customerEmail = customerInfo.Email;
                if (string.IsNullOrEmpty(customerEmail))
                    return BadRequest("Customer email is missing.");

                var SpaServiceInfo = await _paService.GetById(request.ServiceId);
                if (SpaServiceInfo == null)
                    return BadRequest("Spa Service is missing.");

                // Prepare the email
                var fromEmail = "dotruongthinh2212@gmail.com";
                var password = "qxwrvdoqfisooymd";
                var subject = "Spa Service's Request Confirmation";

                // Load both images
                var logoPath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "SenSpa(Black).png");
                var brochurePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "brochure1.jpg");

                var logoBytes = await System.IO.File.ReadAllBytesAsync(logoPath);
                var brochureBytes = await System.IO.File.ReadAllBytesAsync(brochurePath);
                
                // Create the HTML body with the embedded images and Spa Service Team at top right
                var body = $@"
<html>
<body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;'>
    <div style='max-width: 700px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>

<!-- Header Section -->
<div style='text-align: center; position: relative; border-bottom: 2px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 30px;'>
    <img src='cid:logo' alt='Sen Spa Logo' style='width: 200px; height: auto; display: block; margin: 0 auto; position: relative;' />
    <h3 style='position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.6); padding: 3px 10px; color: #6b4b3e; font-size: 25px; font-weight: bold;'>Spa Service Request Confirmed Order</h3>
</div>



        <!-- Greeting Section -->
        <h2 style='color: #6b4b3e;'>Dear {customerInfo.FullName},</h2>
        <p>We are delighted to confirm your spa service request. Here are the details of your booking:</p>

        <!-- Booking Details -->
        <div style='background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;'>
            <ul style='list-style: none; padding: 0;'>
                <li><strong>Request ID:</strong> {id}</li>
                <li><strong>Date:</strong> {request.StartTime.Day}/{request.StartTime.Month}/{request.StartTime.Year}</li>
                <li><strong>Start Time:</strong> {request.StartTime.Hour}:{request.StartTime.Minute:D2}</li>
                <li><strong>End Time:</strong> {request.StartTime.Add(SpaServiceInfo.Duration):HH:mm}</li>
                <li><strong>Service Name:</strong> {SpaServiceInfo.ServiceName}</li>
                <li><strong>Price:</strong> {SpaServiceInfo.Price} VND</li>
            </ul>
        </div>

        <!-- Closing Section -->
        <p>We look forward to providing you with a relaxing and rejuvenating experience.</p>
        <p>Warm regards,</p>
        <p><strong>Spa Service Team</strong></p>

        <!-- Brochure Image -->
        <div style='text-align: center; margin-top: 40px;'>
            <img src='cid:brochure' alt='Spa Brochure' style='max-width: 70%; height: auto; border-radius: 8px;' />
        </div>

    </div>
</body>
</html>";

                // Create the MimeMessage
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Spa Service Team", fromEmail));
                message.To.Add(new MailboxAddress(customerInfo.FullName, customerEmail));
                message.Subject = subject;

                // Create the BodyBuilder and embed both images
                var bodyBuilder = new BodyBuilder
                {
                    HtmlBody = body
                };

                // Embed the logo
                var logo = bodyBuilder.LinkedResources.Add("SenSpa(Black).png", logoBytes, new ContentType("image", "png"));
                logo.ContentId = MimeUtils.GenerateMessageId();

                // Embed the brochure
                var brochure = bodyBuilder.LinkedResources.Add("brochure1.png", brochureBytes, new ContentType("image", "jpg"));
                brochure.ContentId = MimeUtils.GenerateMessageId();

                // Replace the Content-IDs in the HTML
                bodyBuilder.HtmlBody = bodyBuilder.HtmlBody
                    .Replace("cid:logo", $"cid:{logo.ContentId}")
                    .Replace("cid:brochure", $"cid:{brochure.ContentId}");

                message.Body = bodyBuilder.ToMessageBody();

                // Configure the SMTP client using MailKit
                using (var smtpClient = new MailKit.Net.Smtp.SmtpClient())
                {
                    try
                    {
                        await smtpClient.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                        await smtpClient.AuthenticateAsync(fromEmail, password);
                        await smtpClient.SendAsync(message);
                        await smtpClient.DisconnectAsync(true);
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, $"Email sending failed: {ex.Message}");
                    }
                }

                return Ok($"Email sent successfully. Email body: {body}, Customer email: {customerEmail}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
