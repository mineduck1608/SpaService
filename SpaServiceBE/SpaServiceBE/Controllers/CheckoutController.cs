using Azure;
using Microsoft.AspNetCore.Mvc;
using Repositories.Context;
using Repositories.Entities;
using Services;
using Services.IServices;
using SpaServiceBE.Utils;

namespace SpaServiceBE.Controllers
{
    [Route("api/checkouts")]
    [ApiController]
    public class CheckoutController : Controller
    {
        private readonly IVnPayService _vnPayService;
        private readonly ITransactionService _transactionService;
        private readonly IRequestService _requestService;
        private readonly ISpaServiceService _spaService;
        private readonly IAppointmentService _appointmentService;
        private readonly IEmployeeService _employeeService;
        private readonly IServiceTransactionService _svTransService;
        public CheckoutController(IVnPayService vnPayService, ITransactionService transactionService, IRequestService requestService, ISpaServiceService spaService, IAppointmentService appointmentService, IEmployeeService employeeService, IServiceTransactionService svTransService)
        {
            _vnPayService = vnPayService;
            _transactionService = transactionService;
            _requestService = requestService;
            _appointmentService = appointmentService;
            _spaService = spaService;
            _employeeService = employeeService;
            _svTransService = svTransService;
        }


        [HttpGet("PaymentCallbackVnPay")]
        public async Task<IActionResult> PaymentCallbackVnpay()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);
            //Order desc is txn id
            var txnId = response.OrderDescription;
            try
            {
                var x = await UpdateServiceTransaction(txnId);
                return Redirect($"http://localhost:3000/pay-result?{Util.QueryStringFromDict(x)}");
            }
            catch (Exception ex)
            {
            }
            return Redirect($"http://localhost:3000/pay-result?success=false");
        }
        private async Task<Dictionary<string, string>> UpdateServiceTransaction(string transactionId)
        {
            var rs = new Dictionary<string, string>();
            var s = await _transactionService.GetById(transactionId);
            s.Status = true;
            s.CompleteTime = DateTime.Now;
            var serviceTxn = await _svTransService.GetByTransId(transactionId);
            try
            {
                var added = await _transactionService.Update(transactionId, s);
                var req = await _requestService.GetById(serviceTxn.RequestId);
                var service = await _spaService.GetById(req.ServiceId);
                rs.Add("empName", req.EmployeeId ?? "Did not request");
                rs.Add("startTime", req.StartTime.ToString());
                rs.Add("endTime", req.StartTime.Add(service.Duration).ToString());
                rs.Add("serviceName", service.ServiceName);
                if (req.EmployeeId != null)
                {
                    Appointment app = new()
                    {
                        RequestId = req.RequestId,
                        EmployeeId = req.EmployeeId,
                        StartTime = req.StartTime,
                        EndTime = req.StartTime.AddMinutes(service.Duration.TotalMinutes),
                        Status = "Pending",
                        UpdatedAt = null,
                        AppointmentId = Guid.NewGuid().ToString()
                    };
                    var check = await _appointmentService.AddAppointment(app);
                    rs.Add("success", check.ToString());
                }
                rs.Add("success", added.ToString());

            }
            catch (Exception ex)
            {
            }
            return rs;
        }
    }
}
