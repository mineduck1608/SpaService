using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;

namespace SpaServiceBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CheckoutController : Controller
    {
        private readonly IVnPayService _vnPayService;
        private readonly ITransactionService _transactionService;
        private readonly IRequestService _requestService;
        private readonly ISpaServiceService _spaService;
        private readonly IAppointmentService _appointmentService;
        public CheckoutController(IVnPayService vnPayService, ITransactionService transactionService, IRequestService requestService, ISpaServiceService spaService, IAppointmentService appointmentService)
        {
            _vnPayService = vnPayService;
            _transactionService = transactionService;
            _requestService = requestService;
            _appointmentService = appointmentService;
            _spaService = spaService;
        }

        [HttpGet("PaymentCallbackVnPay")]
        public async Task<IActionResult> PaymentCallbackVnpay()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);
            //Order desc is txn id
            var txnId = response.OrderDescription;
            var s = await _transactionService.GetById(txnId);
            s.Status = response.Success;
            try
            {
                var u = await _transactionService.Update(txnId, s);
                var req = await _requestService.GetById(s.RequestId);
                var service = await _spaService.GetById(req.ServiceId);
                if (req.EmployeeId == null)
                {
                    return Redirect($"http://localhost:3000/pay-result?success={u}");
                }
                Appointment app = new()
                {
                    RequestId = req.RequestId,
                    EmployeeId = req.EmployeeId,
                    StartTime = DateTime.Now,
                    EndTime = DateTime.Now.AddMinutes(service.Duration.TotalMinutes),
                    ReplacementEmployee = null,
                    Status = "Processed",
                    UpdatedAt = null,
                    AppointmentId = Guid.NewGuid().ToString()
                };
                var check = await _appointmentService.AddAppointment(app);
                return Redirect($"http://localhost:3000/pay-result?success={check}");
            }
            catch (Exception ex)
            {
            }
            return Redirect($"http://localhost:3000/pay-result?success=false");
        }
    }
}
