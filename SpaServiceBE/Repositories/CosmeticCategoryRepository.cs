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
    public class CosmeticCategoryRepository
    {

       
            private readonly SpaserviceContext _context;

            public CosmeticCategoryRepository(SpaserviceContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<CosmeticCategory>> GetAllCosmeticCategories()
            {
                return await _context.CosmeticCategories.ToListAsync();
            }

            public async Task<CosmeticCategory> GetCosmeticCategoryById(string id)
            {
                return await _context.CosmeticCategories.FindAsync(id);
            }

            public async Task<bool> CreateCosmeticCategory(CosmeticCategory category)
            {
                _context.CosmeticCategories.Add(category);
                return await _context.SaveChangesAsync() > 0;
            }

            public async Task<bool> UpdateCosmeticCategory(CosmeticCategory category)
            {
                _context.CosmeticCategories.Update(category);
                return await _context.SaveChangesAsync() > 0;
            }

            public async Task DeleteCosmeticCategory(string id)
            {
                var category = await _context.CosmeticCategories.FindAsync(id);
                if (category != null)
                {
                    _context.CosmeticCategories.Remove(category);
                    await _context.SaveChangesAsync();
                }
            }
        }
    
}
