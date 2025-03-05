using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class ServiceCategoryRepository
    {
        private readonly SpaserviceContext _context;

        public ServiceCategoryRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Category theo ID với các thực thể liên quan
        public async Task<ServiceCategory> GetById(string categoryId)
        {
            return await _context.ServiceCategories
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId);
        }

        public async Task<ServiceCategory> GetByName(string categoryName)
        {
            return await _context.ServiceCategories
                
                .FirstOrDefaultAsync(c => c.CategoryName == categoryName);
        }

        // Lấy tất cả Categories với các thực thể liên quan
        public async Task<List<ServiceCategory>> GetAll()
        {
            return await _context.ServiceCategories
                .ToListAsync();
        }

        public async Task<ServiceCategory> GetWithEmployee(string id)
        {
            return await _context.ServiceCategories.FirstOrDefaultAsync(x => x.CategoryId == id);
        }

        // Thêm một Category mới
        public async Task<bool> Add(ServiceCategory category)
        {
            try
            {
                await _context.ServiceCategories.AddAsync(category);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Category
        public async Task<bool> Update(string categoryId, ServiceCategory category)
        {
            var existingCategory = await GetById(categoryId);
            if (existingCategory == null) return false;

            existingCategory.CategoryName = category.CategoryName;
            existingCategory.CategoryDescription = category.CategoryDescription;

            try
            {
                _context.ServiceCategories.Update(existingCategory);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Category
        public async Task<bool> Delete(string categoryId)
        {
            var category = await GetById(categoryId);
            if (category == null) return false;

            try
            {
                _context.ServiceCategories.Remove(category);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<int> GetTotalServiceCategory()
        {
            return await _context.ServiceCategories.CountAsync();
        }
    }
}
