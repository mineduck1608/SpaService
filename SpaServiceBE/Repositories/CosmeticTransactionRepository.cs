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
    public class CosmeticTransactionRepository
    {
        private readonly SpaserviceContext _context;

        public CosmeticTransactionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CosmeticTransaction>> GetAllAsync()
        {
            return await _context.Set<CosmeticTransaction>().ToListAsync();
        }

        public async Task<CosmeticTransaction> GetCosmeticTransactionById(string id)
        {
            return await _context.Set<CosmeticTransaction>().FindAsync(id);
        }

        public async Task CreateAsync(CosmeticTransaction transaction)
        {
            await _context.Set<CosmeticTransaction>().AddAsync(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(CosmeticTransaction transaction)
        {
            _context.Set<CosmeticTransaction>().Update(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            //var transaction = await GetByIdAsync(id);
            //if (transaction != null)
            //{
            //    _context.Set<CosmeticTransaction>().Remove(transaction);
            //    await _context.SaveChangesAsync();
            //}
        }
    }
}
