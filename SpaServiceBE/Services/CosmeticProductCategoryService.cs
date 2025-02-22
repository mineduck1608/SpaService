using Repositories;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CosmeticProductCategoryService : ICosmeticProductCategoryService
    {
        private readonly CosmeticProductCategoryRepository _repository;

        public CosmeticProductCategoryService(CosmeticProductCategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CosmeticProductCategory>> GetAllCosmeticProductCategory()
        {
            return await _repository.GetAllCosmeticProductCategory();
        }

        public async Task<CosmeticProductCategory> GetCosmeticProductCategoryById(string id)
        {
            return await _repository.GetCosmeticProductCategoryById(id);
        }

        public async Task<bool> Create(CosmeticProductCategory item)
        {
            return await _repository.Create(item);
        }

        public async Task<bool> Update(CosmeticProductCategory item)
        {
            return await _repository.Update(item);
        }

        public async Task Delete(string id)
        {
            await _repository.Delete(id);
        }
    }
}

