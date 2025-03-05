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
    public class CosmeticCategoryService : ICosmeticCategoryService
    {
        private readonly CosmeticCategoryRepository _cosmeticCategoryRepository;

        public CosmeticCategoryService(CosmeticCategoryRepository cosmeticCategoryRepository)
        {
            _cosmeticCategoryRepository = cosmeticCategoryRepository;
        }

        public async Task<IEnumerable<CosmeticCategory>> GetAllCosmeticCategories()
        {
            return await _cosmeticCategoryRepository.GetAllCosmeticCategories();
        }

        public async Task<CosmeticCategory> GetCosmeticCategoryById(string id)
        {
            return await _cosmeticCategoryRepository.GetCosmeticCategoryById(id);
        }

        public async Task<bool> CreateCosmeticCategory(CosmeticCategory category)
        {
            return await _cosmeticCategoryRepository.CreateCosmeticCategory(category);
        }

        public async Task<bool> UpdateCosmeticCategory(CosmeticCategory category)
        {
            return await _cosmeticCategoryRepository.UpdateCosmeticCategory(category);
        }

        public async Task DeleteCosmeticCategory(string id)
        {
            await _cosmeticCategoryRepository.DeleteCosmeticCategory(id);
        }
        public async Task<int> GetTotalCosmeticCategory()
        {
            return await _cosmeticCategoryRepository.GetTotalCosmeticCategory();
        }
    }
}
