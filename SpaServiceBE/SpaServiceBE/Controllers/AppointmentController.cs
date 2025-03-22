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
using System.Net;
using Microsoft.AspNetCore.Http.Features;

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
        private readonly IEmployeeCommissionService _employeeCommissionService;
        private readonly IComissionService _commissionService;
        public AppointmentController(IAppointmentService appointmentService, ISpaServiceService spaService, ICustomerService customerService, IRequestService requestService, IEmployeeService employeeService, IRoomService roomService, IFloorService floorService, IEmployeeCommissionService employeeCommissionService,
            IComissionService commissionService)
        {
            _service = appointmentService ?? throw new ArgumentNullException(nameof(appointmentService));
            _spaService = spaService ?? throw new ArgumentNullException(nameof(spaService));
            _customerService = customerService ?? throw new ArgumentNullException(nameof(customerService));
            _requestService = requestService ?? throw new ArgumentNullException(nameof(requestService));
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
            _roomService = roomService ?? throw new ArgumentNullException(nameof(roomService));
            _floorService = floorService ?? throw new ArgumentNullException(nameof(floorService));
            _employeeCommissionService = employeeCommissionService ?? throw new ArgumentNullException(nameof(employeeCommissionService));
            _commissionService = commissionService ?? throw new ArgumentNullException(nameof(commissionService));
        }

        // GET: api/appointments/GetAll
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

        [HttpGet("GetAllScheduleApp")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAllAppointmentsScheduleApp()
        {
            try
            {
                var appointments = await _service.GetAllAppointments();

                var result = new List<object>();

                foreach (var appointment in appointments)
                {
                    var spaService = await _spaService.GetById(appointment.Request.ServiceId);
                    var room = await _roomService.GetRoomById(appointment.RoomId);
                    var employee = await _employeeService.GetEmployeeById(appointment.EmployeeId);
                    var customer = await _customerService.GetCustomerById(appointment.Request.CustomerId);  

                    result.Add(new
                    {
                        AppointmentId = appointment.AppointmentId,
                        Status = appointment.Status,
                        StartTime = appointment.StartTime,
                        EndTime = appointment.EndTime,
                        EmployeeName = employee.FullName,
                        RoomNum = room.RoomNum,
                        CustomerName = customer.FullName,
                        ServiceName = spaService.ServiceName,
                        RequestId = appointment.RequestId,
                        ServiceId = spaService.ServiceId,
                        EmployeeId = employee.EmployeeId,
                        RoomId = room.RoomId
                    });
                }
                return Ok(result);
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

        // GET: api/appointments/GetById/{id}
        [HttpGet("GetByRequestId/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointmentByRequestId(string id)
        {
            try
            {
                var appointment = await _service.GetAppointmentByRequestId(id);

                if (appointment == null)
                    return null;

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
                var appointments = await _service.GetAllAppointmentsFromEmployee(id);

                if (appointments == null)
                    return NotFound($"Appointment with ID = {id} not found.");
                var result = new List<object>();

                foreach (var appointment in appointments)
                {
                    var spaService = await _spaService.GetById(appointment.Request.ServiceId);
                    var room = await _roomService.GetRoomById(appointment.RoomId);
                    var employee = await _employeeService.GetEmployeeById(appointment.EmployeeId);
                    var customer = await _customerService.GetCustomerById(appointment.Request.CustomerId);

                    result.Add(new
                    {
                        AppointmentId = appointment.AppointmentId,
                        Status = appointment.Status,
                        StartTime = appointment.StartTime,
                        EndTime = appointment.EndTime,
                        EmployeeName = employee.FullName,
                        RoomNum = room.RoomNum,
                        CustomerName = customer.FullName,
                        ServiceName = spaService.ServiceName,
                        ServiceId = spaService.ServiceId,
                        RequestId = appointment.RequestId,
                        RoomId = room.RoomId
                    });
                }
                return Ok(result);
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

                return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.AppointmentId }, new {appointmentId = appointment.AppointmentId});
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

        [HttpGet("GetByAccId/{id}")]
        public async Task<ActionResult<List<Appointment>>> GetAppointmentByAccId(string id)
        {
            try
            {
                var appointments = await _service.GetAllAppointmentsByAccId(id);

                if (appointments == null)
                    return NotFound($"Appointment with acc ID = {id} not found.");

                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/appointments/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateAppointment(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string employeeId = jsonElement.GetProperty("employeeId").GetString();
                DateTime startTime = jsonElement.TryGetProperty("startTime", out JsonElement e) && e.ValueKind == JsonValueKind.String ? e.GetDateTime() : default;
                string roomId = jsonElement.GetProperty("roomId").GetString();
                string serviceId = jsonElement.GetProperty("serviceId").GetString();




                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(roomId) || string.IsNullOrEmpty(serviceId))
                    return BadRequest(new { msg = "Appointment details are incomplete." });

                var checkAppointmentStatus = await _service.GetAppointmentById(id);
                if (checkAppointmentStatus != null && checkAppointmentStatus.Status == "Finished")
                {
                    return BadRequest(new { msg = "Appointment was completed." });
                }
                if (startTime == default)
                {
                    startTime = checkAppointmentStatus.StartTime;
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



                //create endtime
                var duration = _spaService.GetTimeByServiceId(serviceId);

                TimeOnly durationValue = await duration; // Lấy giá trị thực từ Task<TimeOnly>
                TimeSpan timeSpan = durationValue.ToTimeSpan(); // Chuyển thành TimeSpan
                DateTime endTime = startTime.Add(timeSpan); // Cộng vào DateTime

                //handle duration
                if (endTime.Hour > 20)
                {
                    return BadRequest(new { msg = "The duration can not last until 8PM or later" });
                }

                // Tạo đối tượng Appointment và gán ID cho update
                var appointment = new Appointment
                {
                    AppointmentId = id, // Use the provided ID for the update
                    EmployeeId = employeeId,
                    Status = "Pending", // Default status (you can update based on your logic)
                    StartTime = startTime,
                    EndTime = endTime,
                    RoomId = roomId,
                    Request = checkAppointmentStatus.Request,
                    UpdatedAt = DateTime.Now // Automatically update the timestamp                  
                };

                var b = await _service.CheckResourceAvailable(appointment);
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

                // Gọi service để cập nhật appointment
                var isUpdated = await _service.UpdateAppointment(id, appointment);

                if (!isUpdated)
                    return NotFound(new { msg = $"Appointment with ID = {id} not found." });

                return Ok(new { msg = "Update appoinment successfully.",
                AppointmentId = id});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        // PUT: api/appointments/CheckInCheckOut/{id}
        [HttpPut("CheckInCheckOut/{id}")]
        public async Task<ActionResult> CheckInCheckOut(string id, [FromBody] string action)
        {
            try
            {
                var appointment = await _service.GetAppointmentById(id);

                if (appointment == null)
                {
                    return NotFound(new { msg = $"Appointment with ID = {id} not found." });
                }

                if (action.Equals("checkin", StringComparison.OrdinalIgnoreCase))
                {
                    if (appointment.Status == "Processing" || appointment.Status == "Finished")
                    {
                        return BadRequest(new { msg = "Appointment has already been checked in or completed." });
                    }

                    appointment.CheckIn = DateTime.Now;
                    appointment.Status = "Processing";
                }
                else if (action.Equals("checkout", StringComparison.OrdinalIgnoreCase))
                {
                    if (appointment.Status != "Processing")
                    {
                        return BadRequest(new { msg = "Appointment must be in processing state to check out." });
                    }

                    if (appointment != null && appointment.Request?.ServiceTransactions != null)
                    {
                        foreach (var serviceTransaction in appointment.Request.ServiceTransactions)
                        {
                            var transactionId = serviceTransaction.Transaction?.TransactionId;
                            var serviceTransactionId = serviceTransaction.ServiceTransactionId;
                            var totalTransaction = serviceTransaction.Transaction?.TotalPrice ?? 0.0f;

                            if (!string.IsNullOrEmpty(appointment.EmployeeId) && transactionId != null && serviceTransactionId != null)
                            {
                                var commission = await _commissionService.GetCommissionById("commission");
                                float commissionValue = (float) commission.Percentage / 100;
                                if(commission != null) { 
                                var employeeCommission = new EmployeeCommission
                                {
                                    EmployeeId = appointment.EmployeeId,
                                    CommissionId = commission.CommissionId,
                                    TransactionId = transactionId,
                                    CommissionValue = totalTransaction * commissionValue,
                                    ServiceTransactionId = serviceTransactionId
                                };

                                await _employeeCommissionService.AddEmployeeCommission(employeeCommission);

                                    appointment.CheckOut = DateTime.Now;
                                    appointment.Status = "Finished";
                                }
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine("Either appointment or ServiceTransactions is null.");
                    }
                }
                else
                {
                    return BadRequest(new { msg = "Invalid action. Please use 'checkin' or 'checkout'." });
                }

                // Update appointment
                var isUpdated = await _service.UpdateAppointment(id, appointment);

                if (!isUpdated)
                {
                    return NotFound(new { msg = $"Failed to update appointment with ID = {id}." });
                }

                return Ok(new { msg = $"Appointment {action} successfully.", appointment });
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
        public async Task<ActionResult> SendEmailRequest(string id)
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

        [HttpGet("GetById/{month}/{year}")]
        public async Task<ActionResult<Appointment>> GetTotalAppointmentInMonth(int year, int month)
        {
            try
            {
                var totalAppointmentInMonth = await _service.GetTotalAppointmentInMonth(year, month);



                return Ok(totalAppointmentInMonth);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetMonthlyAppointments/{id}/{year}")]
        public async Task<ActionResult<IEnumerable<object>>> GetMonthlyAppointments(string id, int year)
        {
            if (string.IsNullOrEmpty(id) || year <= 0)
                return BadRequest("Employee ID and year are required.");

            try
            {
                var monthlyAppointments = await _service.GetMonthlyAppointmentCount(id, year);

                if (monthlyAppointments == null || !monthlyAppointments.Any())
                    return NotFound($"No appointments found for Employee ID = {id} in year = {year}.");

                return Ok(monthlyAppointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("OrderByGender")]
        public IActionResult OrderByGender()
        {
            try
            {
                var map = _service.OrderByGender().OrderBy(x => x.Key);
                var result = map.Select(x => new
                {
                    date = x.Key.ToString("MM/yyyy").Replace("-", "/"),
                    x.Value.male,
                    x.Value.female,
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
