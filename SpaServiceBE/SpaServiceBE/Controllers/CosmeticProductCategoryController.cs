using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CosmeticProductCategoryController : ControllerBase
    {
        private readonly ICosmeticProductCategoryService _service;

        public CosmeticProductCategoryController(ICosmeticProductCategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CosmeticProductCategory>>> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CosmeticProductCategory>> GetById(string id)
        {
            var item = await _service.GetById(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateProductCategory([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string cosmeticCategoryId = jsonElement.GetProperty("cosmeticCategoryId").GetString();
                string cosmeticProductId = jsonElement.GetProperty("cosmeticProductId").GetString();

                if (string.IsNullOrEmpty(cosmeticCategoryId) || string.IsNullOrEmpty(cosmeticProductId))
                    return BadRequest(new { msg = "Product category details are incomplete." });

                var productCategory = new CosmeticProductCategory
                {
                    ProductCategoryId = Guid.NewGuid().ToString("N"),
                    CosmeticCategoryId = cosmeticCategoryId,
                    CosmeticProductId = cosmeticProductId
                };

                var isCreated = await _service.Create(productCategory);
                if (!isCreated)
                    return BadRequest();

                return CreatedAtAction(nameof(GetById), new { id = productCategory.ProductCategoryId }, productCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateProductCategory(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string cosmeticCategoryId = jsonElement.GetProperty("cosmeticCategoryId").GetString();
                string cosmeticProductId = jsonElement.GetProperty("cosmeticProductId").GetString();

                if (string.IsNullOrEmpty(cosmeticCategoryId) || string.IsNullOrEmpty(cosmeticProductId))
                    return BadRequest(new { msg = "Product category details are incomplete." });

                var productCategory = new CosmeticProductCategory
                {
                    ProductCategoryId = id,
                    CosmeticCategoryId = cosmeticCategoryId,
                    CosmeticProductId = cosmeticProductId
                };

                var isUpdated = await _service.Update(productCategory);
                if (!isUpdated)
                    return BadRequest();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
