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
        Task<IEnumerable<CosmeticCategory>> GetAllCategories();
        Task<CosmeticCategory> GetCategoryById(string id);
        Task<bool> CreateCategory(CosmeticCategory category);
        Task<bool> UpdateCategory(CosmeticCategory category);
        Task DeleteCategory(string id);
    }
}
