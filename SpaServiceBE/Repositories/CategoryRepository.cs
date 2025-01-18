using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class CategoryRepository
    {
        private readonly SpaServiceContext _context;

        public CategoryRepository(SpaServiceContext context)
        {
            _context = context;
        }

        // Lấy Category theo ID với các thực thể liên quan
        public async Task<Category> GetById(string categoryId)
        {
            return await _context.Categories
                .Include(c => c.SpaServices)  // Bao gồm SpaServices liên quan đến Category
                .Include(c => c.Employees)    // Bao gồm Employees liên quan đến Category
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId);
        }

        // Lấy tất cả Categories với các thực thể liên quan
        public async Task<List<Category>> GetAll()
        {
            return await _context.Categories
                .Include(c => c.SpaServices)  // Bao gồm SpaServices liên quan đến Category
                .Include(c => c.Employees)    // Bao gồm Employees liên quan đến Category
                .ToListAsync();
        }

        // Thêm một Category mới
        public async Task<bool> Add(Category category)
        {
            try
            {
                await _context.Categories.AddAsync(category);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Category
        public async Task<bool> Update(string categoryId, Category category)
        {
            var existingCategory = await GetById(categoryId);
            if (existingCategory == null) return false;

            existingCategory.CategoryName = category.CategoryName;
            existingCategory.CategoryImage = category.CategoryImage;
            existingCategory.CategoryDescription = category.CategoryDescription;

            try
            {
                _context.Categories.Update(existingCategory);
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
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
