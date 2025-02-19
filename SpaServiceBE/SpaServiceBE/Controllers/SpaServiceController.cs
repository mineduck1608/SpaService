using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/spaservices")]
    [ApiController]
    public class SpaServiceController : ControllerBase
    {
        private readonly ISpaServiceService _service;
        private readonly ICategoryService _categoryService;

        public SpaServiceController(ISpaServiceService service, ICategoryService categoryService)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _categoryService = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
        }

        // GET: api/spaservices/GetAll
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<SpaService>>> GetAllSpaServices()
        {
            try
            {
                var spaServices = await _service.GetAll();
                return Ok(spaServices);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/spaservices/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<SpaService>> GetSpaServiceById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ServiceId is required.");

            try
            {
                var spaService = await _service.GetById(id);

                if (spaService == null)
                    return NotFound($"SpaService with ID = {id} not found.");

                return Ok(spaService);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("Create")]
        public async Task<ActionResult> CreateSpaService([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string serviceName = jsonElement.GetProperty("serviceName").GetString();
                float price = jsonElement.GetProperty("price").GetSingle();
                string durationString = jsonElement.GetProperty("duration").GetString();
                string description = jsonElement.GetProperty("description").GetString();
                string serviceImage = jsonElement.GetProperty("serviceImage").GetString();
                string categoryId = jsonElement.GetProperty("categoryId").GetString();

                // Chuyển đổi Duration từ string sang TimeSpan
                TimeSpan duration;
                if (!TimeSpan.TryParse(durationString, out duration))
                {
                    return BadRequest(new { msg = "Invalid duration format. Use HH:mm:ss." });
                }

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(serviceName) || price <= 0 ||
                    string.IsNullOrEmpty(description) || string.IsNullOrEmpty(serviceImage) ||
                    string.IsNullOrEmpty(categoryId))
                {
                    return BadRequest(new { msg = "Spa service details are incomplete or invalid." });
                }

                // Kiểm tra danh mục có tồn tại không
                var category = await _categoryService.GetCategoryById(categoryId);
                if (category == null)
                    return NotFound(new { msg = "Category not found." });

                // Kiểm tra trùng lặp dịch vụ spa
                var existingService = await _service.GetByName(serviceName);
                if (existingService != null)
                    return Conflict(new { msg = "Spa service already exists." });

                // Tạo đối tượng SpaService
                var spaService = new SpaService
                {
                    ServiceId = Guid.NewGuid().ToString("N"),
                    ServiceName = serviceName,
                    Price = price,
                    Duration = duration,
                    Description = description,
                    ServiceImage = serviceImage,
                    CategoryId = categoryId
                };

                // Gọi service để thêm vào database
                var isCreated = await _service.Add(spaService);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the spa service." });

                return CreatedAtAction(nameof(GetSpaServiceById), new { id = spaService.ServiceId }, spaService);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }



        // PUT: api/spaservices/Update/{id}
        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateSpaService(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string serviceName = jsonElement.GetProperty("serviceName").GetString();
                float price = jsonElement.GetProperty("price").GetSingle();
                string durationString = jsonElement.GetProperty("duration").GetString();
                string description = jsonElement.GetProperty("description").GetString();
                string serviceImage = jsonElement.GetProperty("serviceImage").GetString();
                string categoryId = jsonElement.GetProperty("categoryId").GetString();

                // Chuyển đổi Duration từ string sang TimeSpan
                TimeSpan duration;
                if (!TimeSpan.TryParse(durationString, out duration))
                {
                    return BadRequest(new { msg = "Invalid duration format. Use HH:mm:ss." });
                }

                // Kiểm tra dữ liệu đầu vào
                if (string.IsNullOrEmpty(serviceName) || price <= 0 ||
                    string.IsNullOrEmpty(description) || string.IsNullOrEmpty(serviceImage) ||
                    string.IsNullOrEmpty(categoryId))
                {
                    return BadRequest(new { msg = "Spa service details are incomplete or invalid." });
                }

                // Kiểm tra danh mục có tồn tại không
                var category = await _categoryService.GetCategoryById(categoryId);
                if (category == null)
                    return NotFound(new { msg = "Category not found." });

                // Tạo đối tượng SpaService với ID đã cho
                var spaService = new SpaService
                {
                    ServiceId = id, // Assign the ID for the update
                    ServiceName = serviceName,
                    Price = price,
                    Duration = duration,
                    Description = description,
                    ServiceImage = serviceImage,
                    CategoryId = categoryId
                };

                // Gọi service để cập nhật spa service
                var isUpdated = await _service.Update(id, spaService);

                if (!isUpdated)
                    return NotFound(new { msg = $"Spa service with ID = {id} not found." });

                return Ok(new { msg = "Update spa service successfully."});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        // DELETE: api/spaservices/Delete/{id}\
        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteSpaService(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ServiceId is required.");

            try
            {
                var isDeleted = await _service.Delete(id);

                if (!isDeleted)
                    return NotFound($"SpaService with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        [HttpGet("ServiceOfCategory")]
        public async Task<ActionResult> GetServicesOfCategory(string categoryId)
        {
            if (string.IsNullOrEmpty(categoryId))
            {
                return BadRequest("Category Id is required.");
            }
            try
            {
                return Ok((await _service.GetAll()).Where(x => x.CategoryId == categoryId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
