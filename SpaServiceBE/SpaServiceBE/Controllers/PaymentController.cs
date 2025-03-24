using Microsoft.AspNetCore.Mvc;
using Repositories.Entities.Vnpay;
using Services.IServices;

namespace SpaServiceBE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly ITransactionService _transactionService;

        public PaymentController(IVnPayService vnPayService, ITransactionService transactionService)
        {
            _vnPayService = vnPayService;
            _transactionService = transactionService;
        }

        [HttpPost("service")]
        public async Task<IActionResult> CreatePaymentUrlVnpay([FromBody]string transactionId)
        {
            var transaction = await _transactionService.GetById(transactionId);
            if (transaction == null)
            {
                return BadRequest("Transaction does not exist");
            }
            return HandlePaymentUrl(new()
            {
                OrderDescription = transactionId,
                Amount = (decimal)transaction.TotalPrice,
                Name = "",
                OrderType = "other"
            });
        }
        private IActionResult HandlePaymentUrl(PaymentInformationModel model)
        {
            var url = _vnPayService.CreatePaymentUrl(model, HttpContext);

            return Ok(url);
        }
    }
}
