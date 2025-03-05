using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IServiceCategoryService
    {
        Task<ServiceCategory> GetCategoryById(string categoryId);
        Task<List<ServiceCategory>> GetAllCategories();
        Task<bool> AddCategory(ServiceCategory category);
        Task<bool> UpdateCategory(string categoryId, ServiceCategory category);
        Task<bool> DeleteCategory(string categoryId);
        Task<ServiceCategory> GetCategoryByName(string categoryName);
        Task<ServiceCategory> GetWithEmployee(string categoryId);
        Task<int> GetTotalServiceCategory();
    }
}
