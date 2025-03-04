using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICartCosmeticProductService
    {
        Task<IEnumerable<CartCosmeticProduct>> GetAllCartCosmeticProducts();
        Task<CartCosmeticProduct> GetCartCosmeticProductById(string customerId, string productId);
        Task CreateCartCosmeticProduct(CartCosmeticProduct cartCosmeticProduct);
        Task<bool> UpdateCartCosmeticProduct(CartCosmeticProduct cartCosmeticProduct);
        Task DeleteCartCosmeticProduct(string id);
        Task<List<CartCosmeticProduct>> GetByCustomerId(string customerId);
    }
}
