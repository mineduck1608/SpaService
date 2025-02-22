using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;
using System.Text.Json;

namespace SpaServiceBE.Controllers
{
    [Route("api/rooms")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Room>>> GetAllRooms()
        {
            return Ok(await _roomService.GetAllRooms());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoomById(string id)
        {
            var room = await _roomService.GetRoomById(id);
            if (room == null)
                return NotFound();
            return Ok(room);
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateRoom([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string floorId = jsonElement.GetProperty("floorId").GetString();
                int roomNum = jsonElement.GetProperty("roomNum").GetInt32();
                bool status = jsonElement.GetProperty("status").GetBoolean();

                if (string.IsNullOrEmpty(floorId))
                {
                    return BadRequest(new { msg = "Room details are incomplete or invalid." });
                }

                var room = new Room
                {
                    RoomId = Guid.NewGuid().ToString("N"),
                    FloorId = floorId,
                    RoomNum = roomNum,
                    Status = status
                };

                await _roomService.CreateRoom(room);
                return CreatedAtAction(nameof(GetRoomById), new { id = room.RoomId }, room);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateRoom(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                int roomNum = jsonElement.GetProperty("roomNum").GetInt32();
                bool status = jsonElement.GetProperty("status").GetBoolean();

                var room = new Room
                {
                    RoomId = id,
                    RoomNum = roomNum,
                    Status = status
                };

                var isUpdated = await _roomService.UpdateRoom(room);

                if (!isUpdated)
                    return NotFound(new { msg = $"Room with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRoom(string id)
        {
            await _roomService.DeleteRoom(id);
            return NoContent();
        }
    }
}
