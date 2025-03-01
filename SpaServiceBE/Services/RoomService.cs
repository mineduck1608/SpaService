using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Context;
using Repositories.Entities;
using Repositories.Repositories;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class RoomService : IRoomService
    {
        private readonly RoomRepository _roomRepository;

        public RoomService(RoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _roomRepository.GetAllRooms();
        }

        public async Task<Room> GetRoomById(string id)
        {
            return await _roomRepository.GetRoomById(id);
        }

        public async Task CreateRoom(Room room)
        {
            await _roomRepository.CreateRoom(room);
        }

        public async Task<bool> UpdateRoom(Room room)
        {
           return await _roomRepository.UpdateRoom(room);
        }

        public async Task DeleteRoom(string id)
        {
            await _roomRepository.DeleteRoom(id);
        }

        public async Task<Room> GetRoomByFloorAndNumber(string floorId, int roomNum)
        {
            return await _roomRepository.GetRoomByFloorAndNumber(floorId, roomNum);
        }

        public async Task<IEnumerable<Room>> GetRoomsOfCategory(string id)
        {
            return await _roomRepository.GetRoomsOfCategory(id);
        }
    }
}
