using Azure;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        private readonly ICosmeticTransactionService _csTransService;
        public CheckoutController(IVnPayService vnPayService, ITransactionService transactionService, IRequestService requestService, ISpaServiceService spaService, IAppointmentService appointmentService, IEmployeeService employeeService, IServiceTransactionService svTransService, ICosmeticTransactionService cosmeticTransaction)
        {
            _csTransService = cosmeticTransaction;
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
            if (!response.Success)
            {
                return Redirect($"http://localhost:3000/pay-result?success=false");
            }
            //Order desc is txn id
            var txnId = response.OrderDescription;
            try
            {
                var s = await _transactionService.GetById(txnId);
                Dictionary<string, string> result = new();
                s.Status = true;
                s.CompleteTime = DateTime.Now;
                await _transactionService.Update(txnId, s);
                if(s.TransactionType == "Service")
                {
                    result = await UpdateServiceTransaction(s);
                } else
                {
                    result.Add("success", "True");
                    result.Add("type", "Product");
                }
                return Redirect($"http://localhost:3000/pay-result?{Util.QueryStringFromDict(result)}");
            }
            catch (Exception ex)
            {
                return Redirect($"http://localhost:3000/pay-result?success=false");
            }
        }
        private async Task<Dictionary<string, string>> UpdateServiceTransaction(Transaction tr)
        {
            var rs = new Dictionary<string, string>();
            var serviceTxn = await _svTransService.GetByTransId(tr.TransactionId);
            try
            {
                var req = await _requestService.GetById(serviceTxn.RequestId);
                var service = await _spaService.GetById(req.ServiceId);
                rs.Add("startTime", req.StartTime.ToString());
                rs.Add("endTime", req.StartTime.Add(service.Duration.ToTimeSpan()).ToString());
                rs.Add("serviceName", service.ServiceName);
                var rand = await _requestService.PickRandomResource(req, req.EmployeeId == null);
                var emp = await _employeeService.GetEmployeeById(rand.employeeId);
                rs.Add("empName", emp.FullName ?? "Did not request");
                rs.Add("type", "Service");
                rs.Add("success", "True");
            }
            catch (Exception ex)
            {
            }
            return rs;
        }

        private async Task<Dictionary<string, string>> UpdateProductTransaction(Transaction tr)
        {
            var rs = new Dictionary<string, string>();
            var cosTransaction = await _csTransService.GetByTransId(tr.TransactionId);
            try
            {
                rs.Add("type", "Product");
                var products = cosTransaction.Order;
                var s = JsonConvert.SerializeObject(products);
                rs.Add("products", s);
            }
            catch (Exception ex)
            {
            }
            return rs;
        }
    }
}
