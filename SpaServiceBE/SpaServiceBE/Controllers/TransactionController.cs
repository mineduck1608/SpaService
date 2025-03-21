using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Repositories.Entities;
using Repositories.Entities.RequestModel;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _service;
        private readonly IRequestService _requestService;
        private readonly IPromotionService _promotionService;
        private readonly IServiceTransactionService _serviceTransactionService;
        private readonly IMembershipService _membershipService;
        private readonly ICustomerMembershipService _customerMembershipService;

        public TransactionController(ITransactionService service, IRequestService requestService, IServiceTransactionService serviceTransactionService, IMembershipService membershipService, IPromotionService promotionService, ICustomerMembershipService customerMembershipService)
        {
            _promotionService = promotionService;
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _requestService = requestService;
            _serviceTransactionService = serviceTransactionService;
            _membershipService = membershipService;
            _customerMembershipService = customerMembershipService;
        }

        // GET: api/transactions/GetAll

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetAllTransactions()
        {
            try
            {
                var transactions = await _service.GetAll();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/transactions/GetById/{id}

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("TransactionId is required.");

            try
            {
                var transaction = await _service.GetById(id);

                if (transaction == null)
                    return NotFound($"Transaction with ID = {id} not found.");

                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/transactions/Create

        [HttpPost("Create")]
        public async Task<ActionResult> CreateTransaction([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string transactionType = jsonElement.GetProperty("transactionType").GetString();
                string paymentType = jsonElement.GetProperty("paymentType").GetString();
                float totalPrice = jsonElement.GetProperty("totalPrice").GetSingle();
                var code = jsonElement.TryGetProperty("promotionCode", out var promoCode) ? promoCode.GetString() : null;
                jsonElement.TryGetProperty("membershipId", out var membershipId);
                float promoValue = 0, membershipValue = 0;
                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(transactionType) || totalPrice <= 0)
                {
                    return BadRequest(new { msg = "Transaction details are incomplete or invalid." });
                }

                var transaction = new Transaction
                {
                    TransactionId = Guid.NewGuid().ToString(), // Generate unique ID
                    TransactionType = transactionType,
                    Status = false,
                    PaymentType = paymentType,
                    CompleteTime = DateTime.Now
                };

                // Handle promotion
                if (!string.IsNullOrEmpty(code))
                {
                    var promo = await _promotionService.GetByCode(code);
                    if (promo == null)
                    {
                        return BadRequest(new { msg = "Promotion doesn't exist or inactive." });
                    }
                    if(promo.IsActive == false)
                    {
                        return BadRequest(new { msg = "Promotion is inactive." });

                    }
                    promoValue = promo.DiscountValue;
                    transaction.PromotionId = promo.PromotionId;
                }
                // Gọi service để thêm transaction
                ServiceTransaction serviceTrans = null;
                string reqId = jsonElement.GetProperty("requestId").GetString();
                if (transactionType == "Service")
                {
                    

                    serviceTrans = new ServiceTransaction
                    {
                        RequestId = reqId,
                        ServiceTransactionId = Guid.NewGuid().ToString(),
                        TransactionId = transaction.TransactionId
                    };

                    if (membershipId.ValueKind != JsonValueKind.Undefined)
                    {
                        serviceTrans.MembershipId = membershipId.GetString();
                        var membership = await _membershipService.GetMembershipById(serviceTrans.MembershipId);
                        if (membership == null)
                        {
                            return BadRequest(new { msg = "Membership not found" });
                        }
                        membershipValue = membership.Discount;
                    }
                }
                totalPrice = (100 - (membershipValue + promoValue)) / 100 * totalPrice;
                transaction.TotalPrice = totalPrice;
                var isCreated = await _service.Add(transaction);
                if (serviceTrans != null)
                {
                    await _serviceTransactionService.Add(serviceTrans);
                }
                if (!isCreated)
                {
                    return StatusCode(500, new { msg = "An error occurred while creating the transaction." });
                }

                var requestCheck = await _requestService.GetById(reqId);
                var customerId = requestCheck.CustomerId;
                await _customerMembershipService.UpdateOrCreateCustomerMembershipAsync(customerId);
                

                return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.TransactionId }, new { transaction.TransactionId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }




        // PUT: api/transactions/Update/{id}

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateTransaction(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string transactionType = jsonElement.GetProperty("transactionType").GetString();
                float totalPrice = jsonElement.GetProperty("totalPrice").GetSingle();
                bool status = jsonElement.GetProperty("status").GetBoolean();
                string paymentType = jsonElement.GetProperty("paymentType").GetString();
                DateTime completeTime = jsonElement.GetProperty("completeTime").GetDateTime();

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(transactionType) || totalPrice <= 0 || status != null)
                {
                    return BadRequest(new { msg = "Transaction details are incomplete or invalid." });
                }

                // Tạo đối tượng Transaction và gán ID cho update
                var transaction = new Transaction
                {
                    TransactionId = id, // Use the provided ID for the update
                    TransactionType = transactionType,
                    TotalPrice = totalPrice,
                    Status = status,
                    PaymentType = paymentType,
                    CompleteTime = completeTime
                };
                //cap nhat membership neu la loai service va da thanh toan
                if (transactionType == "Service" && status == true)
                {
                    var serviceTransaction = await _serviceTransactionService.GetByTransId(id);
                    if (serviceTransaction == null)
                    {
                        return BadRequest(new { msg = $"serviceTransaction with id {id} not found." });
                    }
                    var membership = await _membershipService.GetMembershipById(serviceTransaction.MembershipId);
                    if (membership == null)
                    {
                        return BadRequest(new { msg = $"Membership with id {serviceTransaction.MembershipId} not found." });
                    }
                    membership.TotalPayment += totalPrice;
                    await _membershipService.UpdateMembership(membership.MembershipId, membership);
                }
                // Gọi service để cập nhật transaction
                var isUpdated = await _service.Update(id, transaction);

                if (!isUpdated)
                    return NotFound(new { msg = $"Transaction with ID = {id} not found." });

                return Ok(new { msg = "Update transaction successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/transactions/Delete/{id}

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteTransaction(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("TransactionId is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"Transaction with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        //get total revenue with true status
        [HttpGet("GetTotalRevenue")]
        public async Task<IActionResult> GetTotalRevenue(DateTime? lower)
        {
            try
            {
                var totalRevenue = await _service.GetTotalRevenue(lower ?? DateTime.Now.AddMonths(-3));
                return Ok(new
                {
                    service = totalRevenue.Item1,
                    product = totalRevenue.Item2,
                    total = totalRevenue.Item1 + totalRevenue.Item2,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("OrderByMonth")]
        public IActionResult OrderByMonth()
        {
            try
            {
                var buckets = _service.OrderByMonths().Select(x => new
                {
                    date = x.Key,
                    revenue = x.Value,
                })
                    .OrderByDescending(x => x.date);
                return Ok(buckets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("OrderByServiceCategory")]
        public IActionResult OrderByServiceCategory(DateTime? lower)
        {
            try
            {
                var buckets = _service.OrderByServiceCategory(lower ?? DateTime.Now.AddMonths(-3)).Select(x => new
                {
                    category = x.Key,
                    revenue = x.Value,
                });
                return Ok(buckets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("OrderByDay")]
        public ActionResult<IEnumerable<float>> OrderByDay()
        {
            try
            {
                var buckets = _service.OrderByDay().OrderBy(x => x.Key);
                var result = buckets.Select(x => new
                {
                    date = x.Key.ToString("dd/MM/yyyy").Replace("-", "/"),
                    service = x.Value.service,
                    product = x.Value.product
                }
                );
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("TransactionsOfCustomer/{id}")]
        public ActionResult<IEnumerable<float>> GetFromCustomers(string id, bool? findInService)
        {
            try
            {
                var result = _service.GetTransactionsOfCustomer(id, findInService ?? false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
