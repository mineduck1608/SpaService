using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/spaservices")]
    [ApiController]
    public class SpaServiceController : ControllerBase
    {
        private readonly ISpaServiceService _service;

        public SpaServiceController(ISpaServiceService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/spaservices/GetAll
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

        // POST: api/spaservices/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateSpaService([FromBody] SpaService spaService)
        {
            if (spaService == null ||
                string.IsNullOrEmpty(spaService.ServiceName) ||
                spaService.Price <= 0 ||
                spaService.Duration == default(TimeOnly) ||
                string.IsNullOrEmpty(spaService.Description) ||
                string.IsNullOrEmpty(spaService.CategoryId))
            {
                return BadRequest("Spa service details are incomplete or invalid.");
            }

            spaService.ServiceId = Guid.NewGuid().ToString(); // Generate unique ID

            try
            {
                var isCreated = await _service.Add(spaService);

                if (!isCreated)
                    return StatusCode(500, "An error occurred while creating the spa service.");

                return CreatedAtAction(nameof(GetSpaServiceById), new { id = spaService.ServiceId }, spaService);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/spaservices/Update/{id}
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateSpaService(string id, [FromBody] SpaService spaService)
        {
            if (spaService == null ||
                string.IsNullOrEmpty(spaService.ServiceName) ||
                spaService.Price <= 0 ||
                spaService.Duration == default(TimeOnly) ||
                string.IsNullOrEmpty(spaService.Description) ||
                string.IsNullOrEmpty(spaService.CategoryId))
            {
                return BadRequest("Spa service details are incomplete or invalid.");
            }

            spaService.ServiceId = id; // Assign the ID for the update

            try
            {
                var isUpdated = await _service.Update(id, spaService);

                if (!isUpdated)
                    return NotFound($"SpaService with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/spaservices/Delete/{id}
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
