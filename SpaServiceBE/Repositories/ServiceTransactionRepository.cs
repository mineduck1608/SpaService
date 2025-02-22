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
    public class ServiceTransactionRepository 
    {
        private readonly SpaserviceContext _context;

        public ServiceTransactionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ServiceTransaction>> GetAllAsync()
        {
            return await _context.ServiceTransactions.ToListAsync();
        }

        public async Task<ServiceTransaction> GetByIdAsync(string id)
        {
            return await _context.ServiceTransactions.FindAsync(id);
        }

        public async Task CreateAsync(ServiceTransaction serviceTransaction)
        {
            await _context.ServiceTransactions.AddAsync(serviceTransaction);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(string id, ServiceTransaction serviceTransaction)
        {
            _context.ServiceTransactions.Update(serviceTransaction);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeleteAsync(string id)
        {
            var entity = await _context.ServiceTransactions.FindAsync(id);
            if (entity != null)
            {
                _context.ServiceTransactions.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
