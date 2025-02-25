using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/cosmeticproducts")]
    [ApiController]
    public class CosmeticProductController : ControllerBase
    {
        private readonly ICosmeticProductService _service;

        public CosmeticProductController(ICosmeticProductService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CosmeticProduct>>> GetAllCosmeticProduct()
        {
            return Ok(await _service.GetAllCosmeticProduct());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<CosmeticProduct>> GetCosmeticProductById(string id)
        {
            var item = await _service.GetCosmeticProductById(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }
        [HttpGet("ProductOfCosmeticCategory/{id}")]
        public async Task<ActionResult> GetCosmeticProductFromCategoryId(string id)
        {
            try
            {
                var products = await _service.GetProductsByCategoryId(id);
                if (products == null || !products.Any())
                {
                    return NotFound(new { msg = $"No products found for category {id}" });
                }
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCosmeticProduct([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string productName = jsonElement.GetProperty("productName").GetString();
                float? price = jsonElement.GetProperty("price").GetSingle();
                int quantity = jsonElement.GetProperty("quantity").GetInt32();
                string description = jsonElement.GetProperty("description").GetString();
                bool isSelling = jsonElement.GetProperty("isSelling").GetBoolean();
                string? image = jsonElement.GetProperty("image").GetString();
                string categoryId = jsonElement.GetProperty("categoryId").GetString();


                var item = new CosmeticProduct
                {
                    ProductId = Guid.NewGuid().ToString("N"),
                    ProductName = productName,
                    Price = price,
                    Quantity = quantity,
                    Description = description,
                    Status = true,
                    IsSelling = true,
                    Image = image,
                    CategoryId = categoryId
                };

                await _service.Create(item);
                return CreatedAtAction(nameof(GetCosmeticProductById), new { id = item.ProductId }, item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCosmeticProduct(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string productName = jsonElement.GetProperty("productName").GetString();
                float? price = jsonElement.GetProperty("price").GetSingle();
                int quantity = jsonElement.GetProperty("quantity").GetInt32();
                string description = jsonElement.GetProperty("description").GetString();
                bool isSelling = jsonElement.GetProperty("isSelling").GetBoolean();
                string? image = jsonElement.GetProperty("image").GetString();
                string categoryId = jsonElement.GetProperty("categoryId").GetString();

                if (string.IsNullOrEmpty(productName) || price <= 0 ||
                   string.IsNullOrEmpty(description) ||
                   string.IsNullOrEmpty(categoryId) ||
                   string.IsNullOrEmpty(isSelling.ToString()))
                {
                    return BadRequest(new { msg = "Spa service details are incomplete or invalid." });
                }

                var product = await _service.GetCosmeticProductById(id);
                if (product == null)
                    return BadRequest(new { msg = "Product ID mismatch." });
                else
                product.ProductName = productName;
                product.Price = price;
                product.Quantity = quantity;
                product.Description = description;
                product.IsSelling = isSelling;
                product.Image = image;
                product.CategoryId = categoryId;

                await _service.Update(product);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCosmeticProduct(string id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
