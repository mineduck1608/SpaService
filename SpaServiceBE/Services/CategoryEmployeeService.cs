using Repositories;
using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class CategoryEmployeeService : ICategoryEmployeeService
    {
        private readonly CategoryEmployeeRepository _categoryEmployeeRepository;

        public CategoryEmployeeService(CategoryEmployeeRepository categoryEmployeeRepository)
        {
            _categoryEmployeeRepository = categoryEmployeeRepository;
        }

        public async Task<List<CategoryEmployee>> GetAllAsync()
        {
            return await _categoryEmployeeRepository.GetAll();
        }

        public async Task<List<CategoryEmployee>> GetByCategoryIdAsync(string categoryId)
        {
            return await _categoryEmployeeRepository.GetByCategoryId(categoryId);
        }

        public async Task<bool> GetByCategoryIdAndEmployeeId(string categoryId, string employeeId)
        {
            return await _categoryEmployeeRepository.GetByCategoryIdAndEmployeeID(categoryId, employeeId);
        }

        public async Task<List<CategoryEmployee>> GetByEmployeeIdAsync(string employeeId)
        {
            return await _categoryEmployeeRepository.GetByEmployeeId(employeeId);
        }

        public async Task<bool> AddAsync(CategoryEmployee categoryEmployee)
        {
            return await _categoryEmployeeRepository.Add(categoryEmployee);
        }

        public async Task<bool> DeleteAsync(string categoryId, string employeeId)
        {
            return await _categoryEmployeeRepository.Delete(categoryId, employeeId);
        }
    }
}
