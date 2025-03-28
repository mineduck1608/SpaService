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
    public class ApplicationRepository
    {
        private readonly SpaserviceContext _context;

        public ApplicationRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Application>> GetAllAsync()
        {
            return await _context.Applications.Include(a => a.Account).Where(x => x.AccountId != null).OrderByDescending(r => r.CreatedAt).ToListAsync();
        }

        public async Task<Application> GetByIdAsync(string id)
        {
            return await _context.Applications.FindAsync(id);
        }

        public async Task<IEnumerable<Application>> GetByAccountIdAsync(string id)
        {
            return await _context.Applications
                .Where(x => x.AccountId == id)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task CreateAsync(Application application)
        {
            await _context.Applications.AddAsync(application);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(Application application)
        {
            _context.Applications.Update(application);
               if (application == null)
            {
                return false;
            }
            try {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task DeleteAsync(string id)
        {
            var application = await _context.Applications.FindAsync(id);
            if (application != null)
            {
                _context.Applications.Remove(application);
                await _context.SaveChangesAsync();
            }
        }
    }
}
