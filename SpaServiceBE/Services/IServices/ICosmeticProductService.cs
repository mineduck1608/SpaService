using Repositories.DTO;
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
        Task<IEnumerable<CosmeticProduct>> GetEverything();
        Task<CosmeticProduct> GetCosmeticProductById(string id);
        Task Create(CosmeticProduct item);
        Task Update(CosmeticProduct item);
        Task Delete(string id);
        Task<IEnumerable<CosmeticProduct>> GetProductsByCategoryId(string categoryId);
        Task<Dictionary<string, CosmeticProduct>> GetProductsOfList(List<string> productIdList);
        Task<int> GetTotalCosmeticProduct();
        Task<int> GetTotalCosmeticProductStock();
        Dictionary<string, ProductStatistic> GetStatistic(DateTime lower);
    }
}
