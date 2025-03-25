using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class FloorRepository
    {
        private readonly SpaserviceContext _context;

        public FloorRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<List<ServiceCategory>> GetCategoriesByIds(List<string> ids)
        {
            return await _context.ServiceCategories.Where(e => ids.Contains(e.CategoryId)).ToListAsync();
        }

        public async Task<IEnumerable<Floor>> GetAllFloors()
        {
            return await _context.Floors.Include(c => c.Category).Where(f => !f.IsDeleted).ToListAsync();
        }

        public async Task<Floor> GetFloorById(string id)
        {
            return await _context.Floors.FindAsync(id);
        }

        public async Task CreateFloor(Floor floor)
        {
            _context.Floors.Add(floor);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateFloor(Floor floor)
        {
            _context.Floors.Update(floor);
           return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeleteFloor(string id)
        {
            var floor = await _context.Floors.FindAsync(id);
            if (floor != null)
            {
                _context.Floors.Remove(floor);
                await _context.SaveChangesAsync();
            }
        }
    }
}
