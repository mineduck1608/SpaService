using Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Context;

namespace Repositories
{
    public class CategoryEmployeeRepository
    {
        private readonly SpaserviceContext _context;

        public CategoryEmployeeRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy danh sách tất cả CategoryEmployee
        public async Task<List<CategoryEmployee>> GetAll()
        {
            return await _context.CategoryEmployees.Include(c => c.Category).Include(e => e.Employee).ToListAsync();
        }

        // Lấy danh sách nhân viên theo CategoryId
        public async Task<List<CategoryEmployee>> GetByCategoryId(string categoryId)
        {
            return await _context.CategoryEmployees
                .Where(ce => ce.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<bool> GetByCategoryIdAndEmployeeID(string categoryId, string employeeId)
        {
            var cateEmployee = await _context.CategoryEmployees
                .FirstOrDefaultAsync(ce => ce.CategoryId == categoryId && ce.EmployeeId == employeeId);
            if(cateEmployee == null)
            {
                return false;
            }
            return true;
        }

        // Lấy danh sách category theo EmployeeId
        public async Task<List<CategoryEmployee>> GetByEmployeeId(string employeeId)
        {
            return await _context.CategoryEmployees
                .Where(ce => ce.EmployeeId == employeeId)
                .ToListAsync();
        }

        // Thêm một CategoryEmployee mới
        public async Task<bool> Add(CategoryEmployee categoryEmployee)
        {
            try
            {
                await _context.CategoryEmployees.AddAsync(categoryEmployee);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Xóa một CategoryEmployee
        public async Task<bool> Delete(string categoryId, string employeeId)
        {
            var categoryEmployee = await _context.CategoryEmployees
                .FirstOrDefaultAsync(ce => ce.CategoryId == categoryId && ce.EmployeeId == employeeId);

            if (categoryEmployee == null) return false;

            try
            {
                _context.CategoryEmployees.Remove(categoryEmployee);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<int> GetTotalCategoryEmployee()
        {
            return await _context.CategoryEmployees.CountAsync();
        }
    }
}
