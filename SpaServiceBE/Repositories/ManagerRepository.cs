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
    public class ManagerRepository
    {
        private readonly SpaserviceContext _context;

        public ManagerRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Manager>> GetAllAsync()
        {
            return await _context.Managers.ToListAsync();
        }

        public async Task<Manager> GetByIdAsync(string id)
        {
            return await _context.Managers.FindAsync(id);
        }

        public async Task AddAsync(Manager manager)
        {
            await _context.Managers.AddAsync(manager);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(Manager manager)
        {
            _context.Managers.Update(manager);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeleteAsync(string id)
        {
            var manager = await _context.Managers.FindAsync(id);
            if (manager != null)
            {
                _context.Managers.Remove(manager);
                await _context.SaveChangesAsync();
            }
        }
    }
}
