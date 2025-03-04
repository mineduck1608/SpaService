using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class CartCosmeticProductService : ICartCosmeticProductService
    {
        private readonly CartCosmeticProductRepository _cartCosmeticProductRepository;

        public CartCosmeticProductService(CartCosmeticProductRepository cartCosmeticProductRepository)
        {
            _cartCosmeticProductRepository = cartCosmeticProductRepository;
        }

        public async Task<IEnumerable<CartCosmeticProduct>> GetAllCartCosmeticProducts()
        {
            return await _cartCosmeticProductRepository.GetAllCartCosmeticProducts();
        }

        public async Task<CartCosmeticProduct> GetCartCosmeticProductById(string customerId, string productId)
        {
            return await _cartCosmeticProductRepository.GetCartCosmeticProductById(customerId, productId);
        }

        public async Task<List<CartCosmeticProduct>> GetByCustomerId(string customerId)
        {
            return await _cartCosmeticProductRepository.GetByCustomerId(customerId);
        }


        public async Task CreateCartCosmeticProduct(CartCosmeticProduct cartCosmeticProduct)
        {
            await _cartCosmeticProductRepository.CreateCartCosmeticProduct(cartCosmeticProduct);
        }

        public async Task<bool> UpdateCartCosmeticProduct(CartCosmeticProduct cartCosmeticProduct)
        {
            return await _cartCosmeticProductRepository.UpdateCartCosmeticProduct(cartCosmeticProduct);
        }

        public async Task DeleteCartCosmeticProduct(string id)
        {
            await _cartCosmeticProductRepository.DeleteCartCosmeticProduct(id);
        }
    }
}
