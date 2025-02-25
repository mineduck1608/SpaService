﻿using Microsoft.AspNetCore.Mvc;
using Repositories.Entities.Vnpay;

namespace SpaServiceBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;

        public PaymentController(IVnPayService vnPayService)
        {
            _vnPayService = vnPayService;
        }

        [HttpPost("service")]
        public IActionResult CreatePaymentUrlVnpayService(PaymentInformationModel model)
        {
            var url = _vnPayService.CreatePaymentUrl(model, HttpContext);

            return Ok(url);
        }


    }
}
