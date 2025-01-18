using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICategoryService
    {
        Task<Category> GetCategoryById(string categoryId);
        Task<List<Category>> GetAllCategories();
        Task<bool> AddCategory(Category category);
        Task<bool> UpdateCategory(string categoryId, Category category);
        Task<bool> DeleteCategory(string categoryId);
    }
}
