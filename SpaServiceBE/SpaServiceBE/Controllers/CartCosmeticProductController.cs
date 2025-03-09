using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/cartcosmeticproducts")]
    [ApiController]
    public class CartCosmeticProductController : ControllerBase
    {
        private readonly ICartCosmeticProductService _cartCosmeticProductService;

        public CartCosmeticProductController(ICartCosmeticProductService cartCosmeticProductService)
        {
            _cartCosmeticProductService = cartCosmeticProductService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CartCosmeticProduct>>> GetAllCartCosmeticProducts()
        {
            return Ok(await _cartCosmeticProductService.GetAllCartCosmeticProducts());
        }

        [HttpGet("GetCartItem")]
        public async Task<ActionResult<CartCosmeticProduct>> GetCartCosmeticProductById(string customerId, string productId)
        {
            var cartCosmeticProduct = await _cartCosmeticProductService.GetCartCosmeticProductById(customerId, productId);
            if (cartCosmeticProduct == null)
                return NotFound();
            return Ok(cartCosmeticProduct);
        }

        [HttpGet("GetByCustomerId/{customerId}")]
        public async Task<ActionResult<CartCosmeticProduct>> GeByCustomerId(string customerId)
        {
            var cartCosmeticProduct = await _cartCosmeticProductService.GetByCustomerId(customerId);
            if (cartCosmeticProduct == null)
                return NotFound();
            return Ok(cartCosmeticProduct);
        }


        [HttpPost("Create")]
        public async Task<ActionResult> CreateCartCosmeticProduct([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                string customerId = jsonElement.GetProperty("customerId").GetString();
                string productId = jsonElement.GetProperty("productId").GetString();
                int quantity = jsonElement.GetProperty("quantity").GetInt32();

                // Validate input
                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(productId) || quantity <= 0)
                {
                    return BadRequest(new { msg = "Cart cosmetic product details are incomplete or invalid." });
                }

                //Checkexit - if exit => update quantity
                var checkExit = await _cartCosmeticProductService.GetCartCosmeticProductById(customerId, productId);
                if(checkExit != null)
                {
                    checkExit.Quantity += quantity;
                    var isUpdated = await _cartCosmeticProductService.UpdateCartCosmeticProduct(checkExit);

                    if (!isUpdated)
                        return NotFound(new { msg = $"Cart cosmetic product not found." });

                    return Ok(checkExit);
                }

                // Create CartCosmeticProduct object
                var cartCosmeticProduct = new CartCosmeticProduct
                {
                    Id = Guid.NewGuid().ToString("N"), // Generate unique ID
                    CustomerId = customerId,
                    ProductId = productId,
                    Quantity = quantity,
                    Included = true,
                };

                // Call service to add cart cosmetic product
                await _cartCosmeticProductService.CreateCartCosmeticProduct(cartCosmeticProduct);

                return CreatedAtAction(nameof(GetCartCosmeticProductById), new { id = cartCosmeticProduct.Id }, cartCosmeticProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCartCosmeticProduct(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                string customerId = jsonElement.GetProperty("customerId").GetString();
                string productId = jsonElement.GetProperty("productId").GetString();
                int quantity = jsonElement.GetProperty("quantity").GetInt32();
                bool included = jsonElement.GetProperty("included").GetBoolean();

                // Validate input
                if (string.IsNullOrEmpty(customerId) || string.IsNullOrEmpty(productId) || quantity <= 0)
                {
                    return BadRequest(new { msg = "Cart cosmetic product details are incomplete or invalid." });
                }

                // Create CartCosmeticProduct object and assign ID for update
                var cartCosmeticProduct = new CartCosmeticProduct
                {
                    Id = id, // Use provided ID for update
                    CustomerId = customerId,
                    ProductId = productId,
                    Quantity = quantity,
                    Included = included
                };

                // Call service to update cart cosmetic product
                var isUpdated = await _cartCosmeticProductService.UpdateCartCosmeticProduct(cartCosmeticProduct);

                if (!isUpdated)
                    return NotFound(new { msg = $"Cart cosmetic product with ID = {id} not found." });

                return Ok(cartCosmeticProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCartCosmeticProduct(string id)
        {
            await _cartCosmeticProductService.DeleteCartCosmeticProduct(id);
            return NoContent();
        }
    }
}
