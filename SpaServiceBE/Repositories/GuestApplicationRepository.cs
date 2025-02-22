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
    public class GuestApplicationRepository
    {
        private readonly SpaserviceContext _context;

        public GuestApplicationRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GuestApplication>> GetAllAsync()
        {
            return await _context.GuestApplications.ToListAsync();
        }

        public async Task<GuestApplication> GetByIdAsync(string id)
        {
            return await _context.GuestApplications.FindAsync(id);
        }

        public async Task AddAsync(GuestApplication guestApplication)
        {
            await _context.GuestApplications.AddAsync(guestApplication);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(GuestApplication guestApplication)
        {
            _context.GuestApplications.Update(guestApplication);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeleteAsync(string id)
        {
            var guestApplication = await _context.GuestApplications.FindAsync(id);
            if (guestApplication != null)
            {
                _context.GuestApplications.Remove(guestApplication);
                await _context.SaveChangesAsync();
            }
        }
    }
}
