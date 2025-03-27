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
using Services.Services;
using System.Drawing;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("api/requests")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _service;
        private readonly ICustomerService _customerService;
        private readonly IConfiguration _configuration;
        private readonly ISpaServiceService _spaService;
        private readonly IAppointmentService _appointmentService;
        private readonly IRequestService _requestService;
        private readonly IEmployeeService _employeeService;
        private readonly IRoomService _roomService;
        private readonly IFloorService _floorService;
        private readonly IServiceTransactionService _serviceTransaction;
        private readonly ITransactionService _transaction;

        public RequestController(IRequestService service, ICustomerService customerService, IConfiguration configuration, ISpaServiceService paService, IAppointmentService appointment, IRequestService requestService, IEmployeeService employeeService, IRoomService roomService, IFloorService floorService, IServiceTransactionService serviceTransaction, ITransactionService transaction)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _customerService = customerService ?? throw new ArgumentNullException(nameof(customerService));
            _configuration = configuration;
            _spaService = paService ?? throw new ArgumentNullException(nameof(paService));
            _appointmentService = appointment ?? throw new ArgumentNullException(nameof(appointment));
            _requestService = requestService ?? throw new ArgumentNullException(nameof(requestService));
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
            _roomService = roomService ?? throw new ArgumentNullException(nameof(roomService));
            _floorService = floorService ?? throw new ArgumentNullException(nameof(floorService));
            _serviceTransaction = serviceTransaction ?? throw new ArgumentNullException(nameof(serviceTransaction));
            _transaction = transaction ?? throw new ArgumentNullException(nameof(transaction));

        }

        [HttpGet("GetCustomerRequest")]
        public async Task<IActionResult> GetCustomerRequests(int page = 1, int limit = 10)
        {
            try
            {
                var (data, totalPages) = await _service.GetPaginatedRequests(page, limit);

                // Lấy danh sách ID duy nhất để tối ưu truy vấn
                var employeeIds = data?.Select(r => r.EmployeeId).Distinct().ToList();
                var customerIds = data.Select(r => r.CustomerId).Distinct().ToList();
                var serviceIds = data.Select(r => r.ServiceId).Distinct().ToList();

                // Truy vấn dữ liệu một lần
                var employees = await _service.GetEmployeesByIds(employeeIds);
                var customers = await _service.GetCustomersByIds(customerIds);
                var services = await _service.GetServicesByIds(serviceIds);

                // Chuyển danh sách sang Dictionary để tra cứu nhanh
                var employeeDict = employees.ToDictionary(e => e.EmployeeId, e => e.FullName);
                var customerDict = customers.ToDictionary(c => c.CustomerId, c => c.FullName);
                var serviceDict = services.ToDictionary(s => s.ServiceId, s => s.ServiceName);

                // Ánh xạ dữ liệu
                var mappedData = data.Select(request => new
                {
                    RequestId = request.RequestId,
                    EmployeeName = employeeDict.TryGetValue(request.EmployeeId ?? "", out var empName) ? empName : "Unknown",
                    CustomerName = customerDict.TryGetValue(request.CustomerId ?? "", out var custName) ? custName : "Unknown",
                    ServiceName = serviceDict.TryGetValue(request.ServiceId ?? "", out var servName) ? servName : "Unknown",
                    StartTime = request.StartTime,
                    CreatedAt = request.CreatedAt,
                    CustomerNote = request.CustomerNote,
                    ManagerNote = request.ManagerNote,
                    Status = request.Status,
                    ServiceId = request.ServiceId
                });

                return Ok(new { data = mappedData, totalPages });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }





        // GET: api/requests/GetAll
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

        [HttpGet("GetByAccId/{id}")]
        public async Task<ActionResult> GetRequestByAccId(string id)
        {
            try
            {
                var requests = await _service.FilterByAccount(id);

                if (requests == null || !requests.Any())
                    return NotFound($"Requests with Account ID = {id} not found.");

                var result = new List<object>();

                foreach (var request in requests)
                {
                    var spaService = await _spaService.GetById(request.ServiceId);
                    var employee = await _employeeService.GetEmployeeById(request.EmployeeId);
                    var serviceTransaction = request.ServiceTransactions.FirstOrDefault(); // Lấy phần tử đầu tiên

                    var transaction = serviceTransaction != null
                        ? await _transaction.GetById(serviceTransaction.TransactionId)
                        : null; // Kiểm tra null trước khi gọi GetById

                    result.Add(new
                    {
                        ServiceName = spaService.ServiceName,
                        CreatedAt = request.CreatedAt,
                        StartTime = request.StartTime,
                        Status = request.Status,
                        EmployeeName = employee?.FullName,
                        TotalPrice = transaction?.TotalPrice,
                        ManagerNote = request.ManagerNote,
                        CustomerNote = request.CustomerNote,
                        TransactionStatus = transaction?.Status
                    });
                }


                return Ok(result);
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
                var SpaServiceInfo = await _spaService.GetById(serviceId);
                if (SpaServiceInfo == null)
                    return BadRequest("Spa Service is missing.");

                //create endtime

                DateTime endTime = startTime.Add(SpaServiceInfo.Duration.ToTimeSpan());
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
                if (startTime.Hour < 8)
                {
                    return BadRequest(new { msg = "Spa isn't open at this hour" });
                }
                //handle duration
                if (endTime.Hour > 22)
                {
                    return BadRequest(new { msg = "The duration can not last until 10PM or later" });
                }
                // Tạo đối tượng Request
                var newRequest = new Request
                {
                    RequestId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    CustomerId = customerId,
                    ServiceId = serviceId,
                    StartTime = startTime,
                    Status = "Pending",
                    CustomerNote = customerNote,
                    ManagerNote = null,
                    CreatedAt = DateTime.Now,
                    EmployeeId = employeeId,
                };
                var b = await _service.CheckResourceAvailable(newRequest);
                var errList = new List<string>();
                if (!b.roomState)
                {
                    errList.Add("No rooms are available at the requested time");
                }
                if (b.employeeState == 1)
                {
                    errList.Add("The requested employee is busy at the requested time");
                }
                if (b.employeeState == 2)
                {
                    errList.Add("No employee is available at the requested time");
                }
                if (errList.Count > 0)
                {
                    return BadRequest(new {msg = string.Join(",", errList)});
                }
                // Gọi service để thêm request
                var isCreated = await _service.Add(newRequest);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the request." });
                await CreateEmailRequest(newRequest.RequestId);
                return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.RequestId }, new { requestId = newRequest.RequestId });
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
                var SpaServiceInfo = await _spaService.GetById(serviceId);
                if (SpaServiceInfo == null)
                    return BadRequest("Spa Service is missing.");

                //create endtime

                DateTime endTime = startTime.Add(SpaServiceInfo.Duration.ToTimeSpan());
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
                    return BadRequest(new { msg = "The Start should be booked 1 months early." });
                }
                if (startTime.Hour > 20 || startTime.Hour < 8)
                {
                    return BadRequest(new { msg = "Bookings can only be made between 8:00 AM and 20:00 PM." });
                }
                //handle duration
                if (endTime.Hour > 20)
                {
                    return BadRequest(new { msg = "The duration can not last until 8PM or later" });
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

        [HttpPut("AssignRequest/{id}")]
        public async Task<ActionResult> AssignRequest(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                DateTime startTime = jsonElement.TryGetProperty("startTime", out JsonElement e) && e.ValueKind == JsonValueKind.String ? e.GetDateTime() : default;
                string roomId = jsonElement.GetProperty("roomId").GetString();
                string serviceId = jsonElement.GetProperty("serviceId").GetString();


                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(roomId))
                    return BadRequest(new { msg = "Appointment details are incomplete." });

                //create endtime
                var duration = _spaService.GetTimeByServiceId(serviceId);

                TimeOnly durationValue = await duration; // Lấy giá trị thực từ Task<TimeOnly>
                TimeSpan timeSpan = durationValue.ToTimeSpan(); // Chuyển thành TimeSpan
                DateTime endTime = startTime.Add(timeSpan); // Cộng vào DateTime

                //handle Start time
                if (startTime < DateTime.Now.AddMinutes(15))
                {
                    return BadRequest(new { msg = "Start time must be at least 15 minutes in the future." });
                }
                if (startTime > DateTime.Now.AddMonths(1))
                {
                    return BadRequest(new { msg = "The Start should be booked 1 months early." });
                }
                if (startTime.Hour > 20 || startTime.Hour < 8)
                {
                    return BadRequest(new { msg = "Bookings can only be made between 8:00 AM and 20:00 PM." });
                }
                //handle duration
                if (endTime.Hour > 20)
                {
                    return BadRequest(new { msg = "The duration can not last until 8PM or later" });
                }

                var updatedRequest = await _service.GetById(id);
                if (updatedRequest == null)
                    return NotFound(new { msg = $"Request with ID = {id} not found." });


                var appointmentExit = await _appointmentService.GetAppointmentByRequestId(id);
                if (appointmentExit != null)

                {
                    return BadRequest(new { msg = "Appointment existed." });
                }
                // Tạo đối tượng Appointment
                var appointment = new Appointment
                {
                    AppointmentId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    RequestId = id,
                    EmployeeId = employeeId,
                    Status = "Pending", // Default status
                    StartTime = startTime,
                    EndTime = endTime,
                    RoomId = roomId,
                    UpdatedAt = DateTime.Now,
                    Request = updatedRequest
                };

                var b = await _appointmentService.CheckResourceAvailable(appointment);
                var errList = new List<string>();
                if (!b.roomState)
                {
                    errList.Add("No rooms are available at the requested time");
                }
                if (b.employeeState == 1)
                {
                    errList.Add("The requested employee is busy at the requested time");
                }
                if (b.employeeState == 2)
                {
                    errList.Add("No employee is available at the requested time");
                }
                if (errList.Count > 0)
                {
                    return BadRequest(new { msg = string.Join(",", errList) });
                }
                ;


                var requestService = await _requestService.GetById(id);
                requestService.EmployeeId = employeeId;
                await _requestService.Update(id, requestService);

                // Gọi service để thêm appointment
                var isCreated = await _appointmentService.AddAppointment(appointment);





                bool result = isCreated; // Giải quyết giá trị Task<bool>
                if (result == false)
                {
                    return StatusCode(500, new { msg = "An error occurred while creating the appointment." });
                }

                updatedRequest.StartTime = startTime;
                updatedRequest.Status = "Completed";

                // Gọi service để cập nhật request
                var isUpdated = await _service.Update(id, updatedRequest);

                if (!isUpdated)
                    return NotFound(new { msg = $"Request with ID = {id} not found." });


                return Ok(new { msg = "Assign request successfully.",
                    AppoinmentId = appointment.AppointmentId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        
        [HttpPost("SendMail/{id}")]
        public async Task<ActionResult> SendEmailRequest(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("RequestId is needed.");
            }

            try
            {
                // Fetch all necessary data (appointment, request, customer, service, employee, room, floor)
                var appointment = await _appointmentService.GetAppointmentById(id);
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


        [HttpPut("DeclineRequest/{id}")]
        public async Task<ActionResult> DeclineRequest(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string managerNote = jsonElement.GetProperty("managerNote").GetString();
               
                // Kiểm tra dữ liệu đầu vào ngay từ đầu
                if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(managerNote))
                    return BadRequest(new { msg = "Note is not provided" });

                // Lấy request từ database
                var updatedRequest = await _service.GetById(id);
                if (updatedRequest == null)
                    return NotFound(new { msg = $"Request with ID = {id} not found." });
                if (updatedRequest.Status.Equals("Denied"))
                {
                    return BadRequest("Request Status is already declined !");
                }
                // Cập nhật trạng thái
                updatedRequest.Status = "Denied";
                updatedRequest.ManagerNote = managerNote;

                // Cập nhật database trước khi gửi email để tránh lỗi
                var isUpdated = await _service.Update(id, updatedRequest);
                if (!isUpdated)
                    return NotFound(new { msg = $"Request with ID = {id} not found." });
                return Ok(new { msg = "Request denied successfully." });
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

                var SpaServiceInfo = await _spaService.GetById(request.ServiceId);
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
                <li><strong>End Time:</strong> {request.StartTime.Add(SpaServiceInfo.Duration.ToTimeSpan()):HH:mm}</li>
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
        [HttpPost("CreateDeclinedMail/{id}")]
        public async Task<ActionResult> CreateDeclineEmailRequest(string id)
        {
            var updatedRequest = await _service.GetById(id);
            if (updatedRequest == null)
                return NotFound(new { msg = $"Request with ID = {id} not found." });
            var customerInfo = await _customerService.GetCustomerById(updatedRequest.CustomerId);
            if (customerInfo == null)
                return NotFound(new { msg = $"Customer info with ID = {updatedRequest.CustomerId} not found." });
            var spaServiceInfo = await _spaService.GetById(updatedRequest.ServiceId);
            if (spaServiceInfo == null)
                return BadRequest(new { msg = "Spa Service is missing." });

            var customerEmail = customerInfo.Email;
            if (string.IsNullOrEmpty(customerEmail))
                return BadRequest(new { msg = "Customer email is missing." });

            // Load hình ảnh trước khi gửi email
            var logoBytes = await System.IO.File.ReadAllBytesAsync(Path.Combine(Directory.GetCurrentDirectory(), "Images", "SenSpa(Black).png"));
            var brochureBytes = await System.IO.File.ReadAllBytesAsync(Path.Combine(Directory.GetCurrentDirectory(), "Images", "brochure1.jpg"));



            // Chuẩn bị nội dung email
            var subject = "Spa Service's Declined Request";
            var rejectBody = $@"
        <html>
        <body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;'>
            <div style='max-width: 700px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>

            <div style='text-align: center; position: relative; border-bottom: 2px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 30px;'>
                <img src='cid:logo' alt='Sen Spa Logo' style='width: 200px; height: auto; display: block; margin: 0 auto; position: relative;' />
                <h3 style='background: rgba(255, 255, 255, 0.6); padding: 3px 10px; color: #6b4b3e; font-size: 25px; font-weight: bold;'>Spa Service Declined Request</h3>
            </div>
            
            <h2>Dear {customerInfo.FullName},</h2>
            <p>Your request has been declined by our manager team.</p>
            <ul>
                <li><strong>Customer:</strong> {customerInfo.FullName}</li>
                <li><strong>Request ID Declined:</strong> {updatedRequest.RequestId}</li>
                <li><strong>Declined Reason:</strong> {updatedRequest.ManagerNote}</li>
            </ul>
            <p>We sincerely apologize for any inconvenience this may have caused.</p>
            <p>Warm regards,</p>
            <p><strong>Spa Service Team</strong></p>
            
            <div style='text-align: center; margin-top: 40px;'>
                <img src='cid:brochure' alt='Spa Brochure' style='max-width: 70%; height: auto; border-radius: 8px;' />
            </div>
        </body>
        </html>";

            // Gửi email không chặn API
            await SendEmail("dotruongthinh2212@gmail.com", "qxwrvdoqfisooymd", customerEmail, customerInfo.FullName, subject, rejectBody, logoBytes, brochureBytes);
            return Ok("Declined mail success");
        }
    }
}
