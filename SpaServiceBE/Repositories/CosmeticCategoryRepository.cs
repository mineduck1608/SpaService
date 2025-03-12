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
        public async Task<int> GetTotalCosmeticCategory()
        {
            return await _context.CosmeticCategories.CountAsync();
        }
        public Dictionary<string, float> OrderByCategory()
        {
            var now = DateTime.Now;
            var lower = new DateTime(now.Year - 1, now.Month, 1);
            var transactions = _context.CosmeticTransactions.Include(x => x.Transaction)
                .Where(x =>
                x.Transaction.Status
            && ((DateTime)x.Transaction.CompleteTime) >= lower
            && ((DateTime)x.Transaction.CompleteTime) < now)
                .Include(x => x.Order)
                .ThenInclude(x => x.OrderDetails)
                .ThenInclude(x => x.Product);
            var result = new Dictionary<string, float>();
            foreach (var x in transactions)
            {
                var details = x.Order.OrderDetails;
                foreach (var detail in details)
                {
                    var k = detail.Product.CategoryId;
                    if (result.ContainsKey(k))
                    {
                        result[k] += x.Transaction.TotalPrice;
                    }
                    else
                    {
                        result.Add(k, x.Transaction.TotalPrice);
                    }
                }
            }
            var allCategories = _context.CosmeticCategories.Select(x => x.CategoryId);
            foreach (var category in allCategories)
            {
                if (!result.ContainsKey(category))
                {
                    result.Add(category, 0);
                }
            }
            return result;
        }
    }

}
