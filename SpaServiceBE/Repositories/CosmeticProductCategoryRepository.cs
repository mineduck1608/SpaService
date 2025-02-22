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
    public class CosmeticProductCategoryRepository
    {
        private readonly SpaserviceContext _context;

        public CosmeticProductCategoryRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CosmeticProductCategory>> GetAll()
        {
            return await _context.CosmeticProductCategories.ToListAsync();
        }

        public async Task<CosmeticProductCategory> GetById(string id)
        {
            return await _context.CosmeticProductCategories.FindAsync(id);
        }

        public async Task<bool> Create(CosmeticProductCategory item)
        {
            _context.CosmeticProductCategories.Add(item);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(CosmeticProductCategory item)
        {
            _context.CosmeticProductCategories.Update(item);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task Delete(string id)
        {
            var item = await _context.CosmeticProductCategories.FindAsync(id);
            if (item != null)
            {
                _context.CosmeticProductCategories.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}
