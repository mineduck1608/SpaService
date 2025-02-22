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

        public async Task<IEnumerable<CosmeticCategory>> GetAllCategories()
        {
            return await _cosmeticCategoryRepository.GetAllCategories();
        }

        public async Task<CosmeticCategory> GetCategoryById(string id)
        {
            return await _cosmeticCategoryRepository.GetCategoryById(id);
        }

        public async Task<bool> CreateCategory(CosmeticCategory category)
        {
            return await _cosmeticCategoryRepository.CreateCategory(category);
        }

        public async Task<bool> UpdateCategory(CosmeticCategory category)
        {
            return await _cosmeticCategoryRepository.UpdateCategory(category);
        }

        public async Task DeleteCategory(string id)
        {
            await _cosmeticCategoryRepository.DeleteCategory(id);
        }
    }
}
