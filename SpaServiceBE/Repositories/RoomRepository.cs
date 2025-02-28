using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class RoomRepository
    {
        private readonly SpaserviceContext _context;

        public RoomRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _context.Rooms.Where(r => r.Status).ToListAsync(); //Only get avaliable room
        }

        public async Task<Room> GetRoomById(string id)
        {
            return await _context.Rooms.FindAsync(id);
        }

        public async Task CreateRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateRoom(Room room)
        {
            _context.Rooms.Update(room);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeleteRoom(string id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room != null)
            {
                _context.Rooms.Remove(room);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Room>> GetRoomsOfCategory(string catId)
        {
            var rooms = await _context.Floors.Include(x => x.Rooms).FirstOrDefaultAsync(x => x.CategoryId == catId);
            return rooms?.Rooms?.ToList();
        }
    }

}
