using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IRoomService
    {

        Task<IEnumerable<Room>> GetAllRooms();
        Task<Room> GetRoomById(string id);
        Task CreateRoom(Room room);
        Task<bool> UpdateRoom(Room room);
        Task DeleteRoom(string id);
    }
}
