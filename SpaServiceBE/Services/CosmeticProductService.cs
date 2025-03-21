using Repositories;
using Repositories.DTO;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{

    public class CosmeticProductService : ICosmeticProductService
    {
        private readonly CosmeticProductRepository _repository;

        public CosmeticProductService(CosmeticProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CosmeticProduct>> GetAllCosmeticProduct()
        {
            return await _repository.GetAllCosmeticProduct();
        }

        public async Task<CosmeticProduct> GetCosmeticProductById(string id)
        {
            return await _repository.GetCosmeticProductById(id);
        }

        public async Task Create(CosmeticProduct item)
        {
            await _repository.Create(item);
        }

        public async Task Update(CosmeticProduct item)
        {
            await _repository.Update(item);
        }

        public async Task Delete(string id)
        {
            await _repository.Delete(id);
        }
        public async Task<IEnumerable<CosmeticProduct>> GetProductsByCategoryId(string categoryId)
        {
            return await _repository.GetProductsByCategoryId(categoryId);
        }

        public async Task<Dictionary<string, CosmeticProduct>> GetProductsOfList(List<string> productIdList)
        {
            return await _repository.GetProductsOfList(productIdList);
        }

        public async Task<int> GetTotalCosmeticProduct()
        {
            return await _repository.GetTotalCosmeticProduct();
        }

        public async Task<int> GetTotalCosmeticProductStock()
        {
            return await _repository.GetTotalCosmeticProductStock();
        }

        public Dictionary<string, ProductStatistic> GetStatistic(DateTime lower)
        {
            return _repository.GetStatistic(lower);
        }

        public async Task<IEnumerable<CosmeticProduct>> GetEverything()
        {
            return await _repository.GetEverything();
        }
    }
}
