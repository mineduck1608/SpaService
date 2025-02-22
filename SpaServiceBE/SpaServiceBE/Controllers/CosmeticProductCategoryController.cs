using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/cosmeticproductcategories")]
    [ApiController]
    public class CosmeticProductCategoryController : ControllerBase
    {
        private readonly ICosmeticProductCategoryService _service;

        public CosmeticProductCategoryController(ICosmeticProductCategoryService service)
        {
            _service = service;
        }
        
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CosmeticProductCategory>>> GetAllCosmeticProductCategory()
        {
            return Ok(await _service.GetAllCosmeticProductCategory());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<CosmeticProductCategory>> GetCosmeticProductCategoryById(string id)
        {
            var item = await _service.GetCosmeticProductCategoryById(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> CreateCosmeticProductCategory([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string cosmeticCategoryId = jsonElement.GetProperty("cosmeticCategoryId").GetString();
                string cosmeticProductId = jsonElement.GetProperty("cosmeticProductId").GetString();

                if (string.IsNullOrEmpty(cosmeticCategoryId) || string.IsNullOrEmpty(cosmeticProductId))
                    return BadRequest(new { msg = "Product category details are incomplete." });

                var cosmeticProductCategory = new CosmeticProductCategory
                {
                    ProductCategoryId = Guid.NewGuid().ToString("N"),
                    CosmeticCategoryId = cosmeticCategoryId,
                    CosmeticProductId = cosmeticProductId
                };

                var isCreated = await _service.Create(cosmeticProductCategory);
                if (!isCreated)
                    return BadRequest();

                return CreatedAtAction(nameof(GetCosmeticProductCategoryById), new { id = cosmeticProductCategory.ProductCategoryId }, cosmeticProductCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateCosmeticProductCategory(string id, [FromBody] dynamic request)
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
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteCosmeticProductCategory(string id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
