using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class ServiceCategoryService : IServiceCategoryService
    {
        private readonly ServiceCategoryRepository _repository;

        public ServiceCategoryService(ServiceCategoryRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Lấy Category theo ID
        public async Task<ServiceCategory> GetCategoryById(string categoryId)
        {
            return await _repository.GetById(categoryId);
        }

        public async Task<ServiceCategory> GetCategoryByName(string categoryName)
        {
            return await _repository.GetByName(categoryName);
        }

        // Lấy tất cả Categories
        public async Task<List<ServiceCategory>> GetAllCategories()
        {
            return await _repository.GetAll();
        }

        // Thêm một Category mới
        public async Task<bool> AddCategory(ServiceCategory category)
        {
            return await _repository.Add(category);
        }

        // Cập nhật Category
        public async Task<bool> UpdateCategory(string categoryId, ServiceCategory category)
        {
            return await _repository.Update(categoryId, category);
        }

        // Xóa Category
        public async Task<bool> DeleteCategory(string categoryId)
        {
            return await _repository.Delete(categoryId);
        }

        public async Task<ServiceCategory> GetWithEmployee(string categoryId)
        {
            return await _repository.GetWithEmployee(categoryId);
        }
    }
}
