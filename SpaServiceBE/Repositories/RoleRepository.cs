using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class RoleRepository
    {
        private readonly SpaServiceContext _context;

        public RoleRepository(SpaServiceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetByIdAsync(string id)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.RoleId == id);
        }

        public async Task<bool> AddAsync(Role role)
        {
            _context.Roles.Add(role);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> UpdateAsync(Role role, string id)
        {
            var existingRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleId == id);
            if (existingRole == null)
                return false;

            existingRole.RoleName = role.RoleName;
            _context.Roles.Update(existingRole);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleId == id);
            if (role == null)
                return false;

            _context.Roles.Remove(role);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
    }
}
