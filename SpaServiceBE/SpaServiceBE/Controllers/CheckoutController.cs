using Microsoft.AspNetCore.Mvc;

namespace SpaServiceBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CheckoutController : Controller
    {
        private readonly IVnPayService _vnPayService;
        public CheckoutController(IVnPayService vnPayService)
        {
            _vnPayService = vnPayService;
        }

        [HttpGet("PaymentCallbackVnPay")]
        public IActionResult PaymentCallbackVnpay()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);

            return Redirect($"http://localhost:3000/pay-result?success={response.Success}");
        }

    }
}
