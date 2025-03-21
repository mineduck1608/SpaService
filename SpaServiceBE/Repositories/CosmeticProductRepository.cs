using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.DTO;
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
            //only get product when status is true and isSelling
            return await _context.CosmeticProducts
                .Where(c => c.Status && c.IsSelling)
                .ToListAsync();
        }
        public async Task<IEnumerable<CosmeticProduct>> GetEverything()
        {
            //only get product when status is true and isSelling
            return await _context.CosmeticProducts
                .Include(c => c.Category)
                .ToListAsync();
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
        public async Task<IEnumerable<CosmeticProduct>> GetProductsByCategoryId(string categoryId)
        {
            return await _context.CosmeticProducts
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();
        }
        public async Task<Dictionary<string, CosmeticProduct>> GetProductsOfList(List<string> list)
        {
            return await _context.CosmeticProducts
                .Where(p => list.Contains(p.ProductId))
                .ToDictionaryAsync(x => x.ProductId, x => x);
        }
        public async Task<int> GetTotalCosmeticProduct()
        {
            return await _context.CosmeticProducts.CountAsync();
        }
        public async Task<int> GetTotalCosmeticProductStock()
        {
            return await _context.CosmeticProducts.SumAsync(c => c.Quantity);
        }

        public Dictionary<string, ProductStatistic> GetStatistic(DateTime lower)
        {
            var orderDetails = _context.OrderDetails
                .Include(x => x.Order)
                .ThenInclude(x => x.CosmeticTransactions)
                .ThenInclude(x => x.Transaction)
                .Where(x => 
                x.Order.CosmeticTransactions.First().Transaction.Status
                && x.Order.OrderDate >= lower)
                .Include(x => x.Order)
                .ThenInclude(x => x.Customer)
                .Select(x => new
                {
                    x.ProductId,
                    x.Quantity,
                    x.SubTotalAmount,
                    x.Order.Customer
                })
                .ToHashSet();
            var products = _context.CosmeticProducts;
            var map = new Dictionary<string, ProductStatistic>();
            foreach (var product in products)
            {
                map.Add(product.ProductId, new());
                var detailsOfThisProd = orderDetails.Where(x => x.ProductId == product.ProductId);
                var x = map[product.ProductId];
                foreach (var item in detailsOfThisProd)
                {
                    var gender = item.Customer.Gender == "Female" ? 0 : 1;
                    x.OrderCount++;
                    x.Revenue += item.SubTotalAmount;
                    x.GenderDistribution[gender]++;
                }
                orderDetails.RemoveWhere(x => x.ProductId == product.ProductId);  
                x.CurrentInStock = product.Quantity;
            }
            return map;
        }
    }
}
