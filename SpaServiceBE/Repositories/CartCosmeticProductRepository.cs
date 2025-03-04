using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories
{
    public class CartCosmeticProductRepository
    {
        private readonly SpaserviceContext _context;

        public CartCosmeticProductRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CartCosmeticProduct>> GetAllCartCosmeticProducts()
        {
            return await _context.CartCosmeticProducts.ToListAsync();
        }

        public async Task<CartCosmeticProduct> GetCartCosmeticProductById(string customerId, string productId)
        {
            return await _context.CartCosmeticProducts.FirstOrDefaultAsync(c => c.CustomerId == customerId && c.ProductId == productId);
        }

        public async Task<List<CartCosmeticProduct>> GetByCustomerId(string customerId)
        {
            return await _context.CartCosmeticProducts.Where(c => c.CustomerId == customerId).ToListAsync();
        }

        public async Task CreateCartCosmeticProduct(CartCosmeticProduct cartCosmeticProduct)
        {
            _context.CartCosmeticProducts.Add(cartCosmeticProduct);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateCartCosmeticProduct(CartCosmeticProduct cartCosmeticProduct)
        {
            _context.CartCosmeticProducts.Update(cartCosmeticProduct);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeleteCartCosmeticProduct(string id)
        {
            var cartCosmeticProduct = await _context.CartCosmeticProducts.FindAsync(id);
            if (cartCosmeticProduct != null)
            {
                _context.CartCosmeticProducts.Remove(cartCosmeticProduct);
                await _context.SaveChangesAsync();
            }
        }
    }
}
