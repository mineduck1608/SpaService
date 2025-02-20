using Microsoft.AspNetCore.Mvc;
using Services;

namespace SpaServiceBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CheckoutController : Controller
    {
        private readonly IVnPayService _vnPayService;
        private readonly ITransactionService _transactionService;
        public CheckoutController(IVnPayService vnPayService, ITransactionService transactionService)
        {
            _vnPayService = vnPayService;
            _transactionService = transactionService;
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
                return Redirect($"http://localhost:3000/pay-result?success={u}");
            }
            catch (Exception ex)
            {
            }
            return Redirect($"http://localhost:3000/pay-result?success=false");
        }

    }
}
