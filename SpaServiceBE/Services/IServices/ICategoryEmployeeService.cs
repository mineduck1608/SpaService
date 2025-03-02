using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ICategoryEmployeeService
    {
        Task<List<CategoryEmployee>> GetAllAsync();
        Task<List<CategoryEmployee>> GetByCategoryIdAsync(string categoryId);
        Task<List<CategoryEmployee>> GetByEmployeeIdAsync(string employeeId);
        Task<bool> AddAsync(CategoryEmployee categoryEmployee);
        Task<bool> DeleteAsync(string categoryId, string employeeId);
        Task<bool> GetByCategoryIdAndEmployeeId(string categoryId, string employeeId);
    }
}
