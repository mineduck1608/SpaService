using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class CategoryService : ICategoryService
    {
        private readonly CategoryRepository _repository;

        public CategoryService(CategoryRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Lấy Category theo ID
        public async Task<Category> GetCategoryById(string categoryId)
        {
            return await _repository.GetById(categoryId);
        }

        public async Task<Category> GetCategoryByName(string categoryName)
        {
            return await _repository.GetByName(categoryName);
        }

        // Lấy tất cả Categories
        public async Task<List<Category>> GetAllCategories()
        {
            return await _repository.GetAll();
        }

        // Thêm một Category mới
        public async Task<bool> AddCategory(Category category)
        {
            return await _repository.Add(category);
        }

        // Cập nhật Category
        public async Task<bool> UpdateCategory(string categoryId, Category category)
        {
            return await _repository.Update(categoryId, category);
        }

        // Xóa Category
        public async Task<bool> DeleteCategory(string categoryId)
        {
            return await _repository.Delete(categoryId);
        }
    }
}
