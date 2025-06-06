﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            var room = await _roomService.GetAllRooms();

            var data = room.Select(r => new
            {
                FloorNum = r.Floor.FloorNum,
                RoomNum = r.RoomNum,
                RoomId = r.RoomId,
            });
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoomById(string id)
        {
            var room = await _roomService.GetRoomById(id);
            if (room == null)
                return NotFound();
            return Ok(room);
        }

        //[HttpPost("Create")]
        //public async Task<ActionResult> CreateRoom([FromBody] dynamic request)
        //{
        //    try
        //    {
        //        var jsonElement = (JsonElement)request;

        //        string floorId = jsonElement.GetProperty("floorId").GetString();
        //        int roomNum = jsonElement.GetProperty("roomNum").GetInt32();


        //        if (string.IsNullOrEmpty(floorId) || roomNum <=0)
        //        {
        //            return BadRequest(new { msg = "Room details are incomplete or invalid." });
        //        }

        //        var room = new Room
        //        {
        //            RoomId = Guid.NewGuid().ToString("N"),
        //            FloorId = floorId,
        //            RoomNum = roomNum,
        //        };

        //        await _roomService.CreateRoom(room);
        //        return CreatedAtAction(nameof(GetRoomById), new { id = room.RoomId }, room);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
        //    }
        //}

        [HttpPost("Create")]
        public async Task<ActionResult> CreateRoom([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                string floorId = jsonElement.GetProperty("floorId").GetString();
                int roomNum = jsonElement.GetProperty("roomNum").GetInt32();

                if (string.IsNullOrEmpty(floorId) || roomNum <= 0)
                {
                    return BadRequest(new { msg = "Room details are incomplete or invalid." });
                }

                // Check if the room already exists
                var existingRoom = await _roomService.GetRoomByFloorAndNumber(floorId, roomNum);

                if(existingRoom != null) { 
                         if (existingRoom.Status == true && existingRoom.IsDeleted == false)
                        {
                    return Conflict(new { msg = "Room already exists with the given floorId and roomNum." });
                        }
                }

                var room = new Room
                {
                    RoomId = Guid.NewGuid().ToString("N"),
                    FloorId = floorId,
                    RoomNum = roomNum,
                    Status = true,
                    IsDeleted = false
                };

                await _roomService.CreateRoom(room);
                return CreatedAtAction(nameof(GetRoomById), new { id = room.RoomId }, room);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }


        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateRoom(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;
                string floorId = jsonElement.GetProperty("floorId").GetString();
                int roomNum = jsonElement.GetProperty("roomNum").GetInt32();
                
                if (string.IsNullOrEmpty(floorId) || roomNum <= 0)
                {
                    return BadRequest(new { msg = "Room details are incomplete or invalid." });
                }

                var room = new Room
                {
                    RoomId = id,
                    RoomNum = roomNum,
                    FloorId = floorId,
                    Status = true,
                    IsDeleted = false
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
        
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRoom(string id)
        {
            var room = await _roomService.GetRoomById(id);
            if (room == null)
                return NotFound(new { msg = $"Room with ID = {id} not found." });

            room.IsDeleted = true;
            room.Status = false;
            var isUpdated = await _roomService.UpdateRoom(room);

            if (!isUpdated)
                return NotFound(new { msg = $"Room with ID = {id} not found." });
            return NoContent();
        }

        [HttpGet("GetRoomsOfCategory/{id}")]
        public async Task<ActionResult<Account>> GetRoomsOfCategory(string id)
        {

            var room = await _roomService.GetRoomsOfCategory(id);

            if (room == null)
                return NotFound($"Room with ID = {id} not found.");

            return Ok(room);


        }

    }
}
