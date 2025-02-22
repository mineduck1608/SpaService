using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FloorController : ControllerBase
    {
        private readonly IFloorService _floorService;

        public FloorController(IFloorService floorService)
        {
            _floorService = floorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Floor>>> GetAllFloors()
        {
            return Ok(await _floorService.GetAllFloors());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Floor>> GetFloorById(string id)
        {
            var floor = await _floorService.GetFloorById(id);
            if (floor == null)
                return NotFound();
            return Ok(floor);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateFloor([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                int floorNum = jsonElement.GetProperty("floorNum").GetInt32();
                string categoryId = jsonElement.GetProperty("categoryId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(categoryId))
                {
                    return BadRequest(new { msg = "Floor details are incomplete or invalid." });
                }

                // Create Floor object
                var floor = new Floor
                {
                    FloorId = Guid.NewGuid().ToString("N"), // Generate unique ID
                    FloorNum = floorNum,
                    CategoryId = categoryId
                };

                // Call service to add floor
                await _floorService.CreateFloor(floor);

                return CreatedAtAction(nameof(GetFloorById), new { id = floor.FloorId }, floor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateFloor(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Extract data from request
                int floorNum = jsonElement.GetProperty("floorNum").GetInt32();
                string categoryId = jsonElement.GetProperty("categoryId").GetString();

                // Validate input
                if (string.IsNullOrEmpty(categoryId))
                {
                    return BadRequest(new { msg = "Floor details are incomplete or invalid." });
                }

                // Create Floor object and assign ID for update
                var floor = new Floor
                {
                    FloorId = id, // Use provided ID for update
                    FloorNum = floorNum,
                    CategoryId = categoryId
                };

                // Call service to update floor
                var isUpdated = await _floorService.UpdateFloor(floor);

                if (!isUpdated)
                    return NotFound(new { msg = $"Floor with ID = {id} not found." });

                return Ok(floor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFloor(string id)
        {
            await _floorService.DeleteFloor(id);
            return NoContent();
        }
    }
}
