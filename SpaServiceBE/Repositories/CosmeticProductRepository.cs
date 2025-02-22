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
    public class CosmeticProductRepository
    {
        private readonly SpaserviceContext _context;

        public CosmeticProductRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CosmeticProduct>> GetAllCosmeticProduct()
        {
            return await _context.CosmeticProducts.ToListAsync();
        }

        public async Task<CosmeticProduct> GetCosmeticProductById(string id)
        {
            return await _context.CosmeticProducts.FindAsync(id);
        }

        public async Task Create(CosmeticProduct item)
        {
            _context.CosmeticProducts.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task Update(CosmeticProduct item)
        {
            _context.CosmeticProducts.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(string id)
        {
            var item = await _context.CosmeticProducts.FindAsync(id);
            if (item != null)
            {
                _context.CosmeticProducts.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}
