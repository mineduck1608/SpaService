using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICosmeticCategoryService
    {
        Task<IEnumerable<CosmeticCategory>> GetAllCosmeticCategories();
        Task<CosmeticCategory> GetCosmeticCategoryById(string id);
        Task<bool> CreateCosmeticCategory(CosmeticCategory category);
        Task<bool> UpdateCosmeticCategory(CosmeticCategory category);
        Task DeleteCosmeticCategory(string id);
    }
}
