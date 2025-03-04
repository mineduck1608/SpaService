using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MimeKit.Utils;
using MimeKit;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _service;
        private readonly ISpaServiceService _spaService;
        private readonly ICustomerService _customerService;
        private readonly IRequestService _requestService;
        private readonly IEmployeeService _employeeService;
        private readonly IRoomService _roomService;
        private readonly IFloorService _floorService;
        public AppointmentController(IAppointmentService appointmentService, ISpaServiceService spaService, ICustomerService customerService, IRequestService requestService, IEmployeeService employeeService, IRoomService roomService, IFloorService floorService)
        {
            _service = appointmentService ?? throw new ArgumentNullException(nameof(appointmentService));
            _spaService = spaService ?? throw new ArgumentNullException(nameof(spaService));
            _customerService = customerService ?? throw new ArgumentNullException(nameof(customerService));
            _requestService = requestService ?? throw new ArgumentNullException(nameof(requestService));
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
            _roomService = roomService ?? throw new ArgumentNullException(nameof(roomService));
            _floorService = floorService ?? throw new ArgumentNullException(nameof(floorService));
        }

        // GET: api/appointments/GetAll
        [Authorize(Roles = "Customer, Admin")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAllAppointments()
        {
            try
            {
                var appointments = await _service.GetAllAppointments();
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/appointments/GetById/{id}
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointmentById(string id)
        {
            try
            {
                var appointment = await _service.GetAppointmentById(id);

                if (appointment == null)
                    return NotFound($"Appointment with ID = {id} not found.");

                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetAppointmentByEmployeeId/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointmentFromEmployeeId(string id)
        {
            try
            {
                var appointment = await _service.GetAllAppointmentsFromEmployee(id);

                if (appointment == null)
                    return NotFound($"Appointment with ID = {id} not found.");

                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/appointments/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateAppointment([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string requestId = jsonElement.GetProperty("requestId").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                DateTime startTime = jsonElement.TryGetProperty("startTime", out JsonElement e) && e.ValueKind == JsonValueKind.String ? e.GetDateTime() : default;
                DateTime endTime = jsonElement.TryGetProperty("endTime", out JsonElement a) && a.ValueKind == JsonValueKind.String ? a.GetDateTime() : default;
                string? replacementEmployee = jsonElement.TryGetProperty("replacementEmployee", out var replacementEmployeeProp) ? replacementEmployeeProp.GetString() : null;
                string roomId = jsonElement.GetProperty("roomId").GetString();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(requestId) || string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(roomId))
                    return BadRequest(new { msg = "Appointment details are incomplete." });

                // Tạo đối tượng Appointment
                var appointment = new Appointment
                {
                    AppointmentId = Guid.NewGuid().ToString(), // Generate unique ID
                    RequestId = requestId,
                    EmployeeId = employeeId,
                    Status = "Unprocessed", // Default status
                    StartTime = startTime,
                    EndTime = endTime,
                    RoomId = roomId,
                };

                // Gọi service để thêm appointment
                var isCreated = await _service.AddAppointment(appointment);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the appointment." });

                return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.AppointmentId }, appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        //// POST: api/appointments/Create
        //[HttpPost("Create")]
        //public async Task<ActionResult> CreateAppointment([FromBody] dynamic request)
        //{
        //    try
        //    {
        //        var jsonElement = (JsonElement)request;

        //        // Lấy dữ liệu từ request
        //        string requestId = jsonElement.GetProperty("requestId").GetString();
        //        string employeeId = jsonElement.GetProperty("employeeId").GetString();
        //        DateTime startTime = jsonElement.TryGetProperty("startTime", out JsonElement e) && e.ValueKind == JsonValueKind.String ? e.GetDateTime() : default;
        //        string roomId = jsonElement.GetProperty("roomId").GetString();

        //        // Kiểm tra dữ liệu đầu vào
        //        if (string.IsNullOrEmpty(requestId) || string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(roomId))
        //            return BadRequest(new { msg = "Appointment details are incomplete." });

        //        var spaSerivceId = _requestService.GetSpaServiceIdByRequestId(requestId);
        //        var duration = _spaService.GetTimeByServiceId(spaSerivceId.ToString());

        //        TimeOnly durationValue = await duration; // Lấy giá trị thực từ Task<TimeOnly>
        //        TimeSpan timeSpan = durationValue.ToTimeSpan(); // Chuyển thành TimeSpan
        //        DateTime endTime = startTime + timeSpan; // Cộng vào DateTime


        //        // Tạo đối tượng Appointment
        //        var appointment = new Appointment
        //        {
        //            AppointmentId = Guid.NewGuid().ToString(), // Generate unique ID
        //            RequestId = requestId,
        //            EmployeeId = employeeId,
        //            Status = "Unprocessed", // Default status
        //            StartTime = startTime,
        //            EndTime = endTime,
        //            RoomId = roomId,
        //        };

        //        // Gọi service để thêm appointment
        //        var isCreated = await _service.AddAppointment(appointment);

        //        if (!isCreated)
        //            return StatusCode(500, new { msg = "An error occurred while creating the appointment." });

        //        return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.AppointmentId }, appointment);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
        //    }
        //}

        [Authorize]
        [HttpGet("GetByAccId/{id}")]
        public async Task<ActionResult<List<Request>>> GetAppointmentByAccId(string id)
        {
            try
            {
                var request = await _service.GetAllAppointmentsByAccId(id);

                if (request == null)
                    return NotFound($"Request with ID = {id} not found.");

                return Ok(request);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/appointments/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateAppointment(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string requestId = jsonElement.GetProperty("requestId").GetString();
                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                DateTime startTime = jsonElement.TryGetProperty("startTime", out JsonElement e) && e.ValueKind == JsonValueKind.String ? e.GetDateTime() : default;
                DateTime endTime = jsonElement.TryGetProperty("endTime", out JsonElement a) && a.ValueKind == JsonValueKind.String ? a.GetDateTime() : default;


                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(requestId) || string.IsNullOrEmpty(employeeId))
                    return BadRequest(new { msg = "Appointment details are incomplete." });

                // Tạo đối tượng Appointment và gán ID cho update
                var appointment = new Appointment
                {
                    AppointmentId = id, // Use the provided ID for the update
                    RequestId = requestId,
                    EmployeeId = employeeId,
                    Status = "Pending", // Default status (you can update based on your logic)
                    StartTime = startTime,
                    EndTime = endTime,
                    UpdatedAt = DateTime.Now // Automatically update the timestamp
                };

                // Gọi service để cập nhật appointment
                var isUpdated = await _service.UpdateAppointment(id, appointment);

                if (!isUpdated)
                    return NotFound(new { msg = $"Appointment with ID = {id} not found." });

                return Ok(new { msg = "Update appoinment successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/appointments/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteAppointment(string id)
        {
            try
            {
                var isDeleted = await _service.DeleteAppointment(id);

                if (!isDeleted)
                    return NotFound($"Appointment with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        //create mail appoint for customer and employee
        //put appointmentId in here to send email to both of them
        [HttpPost("CreateMail/{id}")]
        public async Task<ActionResult> CreateEmailRequest(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("RequestId is needed.");
            }

            try
            {
                // Fetch all necessary data (appointment, request, customer, service, employee, room, floor)
                var appointment = await _service.GetAppointmentById(id);
                if (appointment == null) return NotFound($"Appointment with ID = {id} not found.");

                var request = await _requestService.GetById(appointment.RequestId);
                if (request == null) return NotFound($"Request with ID = {appointment.RequestId} not found.");

                var customerInfo = await _customerService.GetCustomerById(request.CustomerId);
                if (customerInfo == null) return NotFound($"Customer info with ID = {request.CustomerId} not found.");
                var customerEmail = customerInfo.Email;
                if (string.IsNullOrEmpty(customerEmail)) return BadRequest("Customer email is missing.");

                var spaServiceInfo = await _spaService.GetById(request.ServiceId);
                if (spaServiceInfo == null) return BadRequest("Spa Service is missing.");

                var employee = await _employeeService.GetEmployeeById(request.EmployeeId);
                if (employee == null) return BadRequest($"Employee with ID = {request.EmployeeId} not found.");
                var employeeEmail = employee.Email;
                if (string.IsNullOrEmpty(employeeEmail)) return BadRequest("Employee email is missing.");

                var room = await _roomService.GetRoomById(appointment.RoomId);
                if (room == null) return BadRequest($"Room with ID = {appointment.RoomId} not found.");

                var floor = await _floorService.GetFloorById(room.FloorId);
                if (floor == null) return BadRequest($"Floor with ID = {room.FloorId} not found.");

                // Email configurations
                var fromEmail = "dotruongthinh2212@gmail.com";
                var password = "qxwrvdoqfisooymd";
                var subjectCustomer = "Spa Service's Request Confirmation";
                var subjectEmployee = "New Appointment Assigned";

                // Load images
                var logoPath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "SenSpa(Black).png");
                var brochurePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "brochure1.jpg");

                var logoBytes = await System.IO.File.ReadAllBytesAsync(logoPath);
                var brochureBytes = await System.IO.File.ReadAllBytesAsync(brochurePath);

                // Prepare email body for Customer
                var customerBody = $@"
                <html>
<body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;'>
    <div style='max-width: 700px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>

<!-- Header Section -->
<div style='text-align: center; position: relative; border-bottom: 2px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 30px;'>
    <img src='cid:logo' alt='Sen Spa Logo' style='width: 200px; height: auto; display: block; margin: 0 auto; position: relative;' />
    <h3 style='position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.6); padding: 3px 10px; color: #6b4b3e; font-size: 25px; font-weight: bold;'>Spa Service Request Confirmed Order</h3>
</div>
                <body>
                    <h2>Dear {customerInfo.FullName},</h2>
                    <p>We have created an appointmen from your request, here's your appointment details:</p>
                    <ul>
                        <li><strong>Date:</strong> {appointment.StartTime:dd/MM/yyyy}</li>
                        <li><strong>Start Time:</strong> {appointment.StartTime:HH:mm}</li>
                        <li><strong>End Time:</strong> {appointment.StartTime.Add(spaServiceInfo.Duration.ToTimeSpan()):HH:mm}</li>
                        <li><strong>Service:</strong> {spaServiceInfo.ServiceName}</li>
                        <li><strong>Employee:</strong> {employee.FullName}</li>
                        <li><strong>Room:</strong> {room.RoomNum}, Floor {floor.FloorNum}</li>
                    </ul>
    <p>We look forward to providing you with a relaxing and rejuvenating experience.</p>
            <p>Warm regards,</p>
            <p><strong>Spa Service Team</strong></p>

     <div style='text-align: center; margin-top: 40px;'>
                <img src='cid:brochure' alt='Spa Brochure' style='max-width: 70%; height: auto; border-radius: 8px;' />
            </div>
        
                </body>
                </html>";

                // Prepare email body for Employee
                var employeeBody = $@"
                <html>
<body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;'>
    <div style='max-width: 700px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>

<!-- Header Section -->
<div style='text-align: center; position: relative; border-bottom: 2px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 30px;'>
    <img src='cid:logo' alt='Sen Spa Logo' style='width: 200px; height: auto; display: block; margin: 0 auto; position: relative;' />
    <h3 style='position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.6); padding: 3px 10px; color: #6b4b3e; font-size: 25px; font-weight: bold;'>Spa Service Request Confirmed Order</h3>
</div>
                <body>
                    <h2>Dear {employee.FullName},</h2>
                    <p>You have been assigned by the manager team in a new appointment:</p>
                    <ul>
                        <li><strong>Customer:</strong> {customerInfo.FullName}</li>
                        <li><strong>Date:</strong> {appointment.StartTime:dd/MM/yyyy}</li>
                        <li><strong>Start Time:</strong> {appointment.StartTime:HH:mm}</li>
                        <li><strong>End Time:</strong> {appointment.StartTime.Add(spaServiceInfo.Duration.ToTimeSpan()):HH:mm}</li>
                        <li><strong>Service:</strong> {spaServiceInfo.ServiceName}</li>
                        <li><strong>Room:</strong> {room.RoomNum}, Floor {floor.FloorNum}</li>
                        <li><strong>Customer Note:</strong> {request.CustomerNote}</li>
                        <li><strong>Manager Note:</strong> {request.ManagerNote}</li>
                    </ul>
                    <p>Please be prepare for your next appointment.</p>
                    <p>Warm regards,</p>
                    <p><strong>Spa Service Team</strong></p>
 <div style='text-align: center; margin-top: 40px;'>
            <img src='cid:brochure' alt='Spa Brochure' style='max-width: 70%; height: auto; border-radius: 8px;' />
        </div>
                </body>
                </html>";

                // Send emails
                await SendEmail(fromEmail, password, customerEmail, customerInfo.FullName, subjectCustomer, customerBody, logoBytes, brochureBytes);
                await SendEmail(fromEmail, password, employeeEmail, employee.FullName, subjectEmployee, employeeBody, logoBytes, brochureBytes);

                return Ok("Emails sent successfully to both customer and employee.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private async Task SendEmail(string fromEmail, string password, string toEmail, string toName, string subject, string body, byte[] logoBytes, byte[] brochureBytes)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Spa Service Team", fromEmail));
            message.To.Add(new MailboxAddress(toName, toEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = body };

            var logo = bodyBuilder.LinkedResources.Add("SenSpa(Black).png", logoBytes, new ContentType("image", "png"));
            logo.ContentId = MimeUtils.GenerateMessageId();

            var brochure = bodyBuilder.LinkedResources.Add("brochure1.png", brochureBytes, new ContentType("image", "jpg"));
            brochure.ContentId = MimeUtils.GenerateMessageId();

            bodyBuilder.HtmlBody = bodyBuilder.HtmlBody
                .Replace("cid:logo", $"cid:{logo.ContentId}")
                .Replace("cid:brochure", $"cid:{brochure.ContentId}");

            message.Body = bodyBuilder.ToMessageBody();

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
                    throw new Exception($"Failed to send email to {toEmail}: {ex.Message}");
                }
            }
        }

    }
}
