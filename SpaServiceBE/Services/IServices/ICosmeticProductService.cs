using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICosmeticProductService
    {
        Task<IEnumerable<CosmeticProduct>> GetAllCosmeticProduct();
        Task<CosmeticProduct> GetCosmeticProductById(string id);
        Task Create(CosmeticProduct item);
        Task Update(CosmeticProduct item);
        Task Delete(string id);
        Task<IEnumerable<CosmeticProduct>> GetProductsByCategoryId(string categoryId);
    }
}
