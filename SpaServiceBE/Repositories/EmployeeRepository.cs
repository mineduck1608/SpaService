using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class EmployeeRepository
    {
        private readonly SpaserviceContext _context;

        public EmployeeRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Employee theo ID với các thực thể liên quan
        public async Task<Employee> GetById(string employeeId)
        {
            return await _context.Employees
                .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
        }

        public async Task<Employee> GetEmployeeByPhone(string phone)
        {
            return await _context.Employees.FirstOrDefaultAsync(a => a.Phone == phone);
        }

        public async Task<Employee> GetEmployeeByAccountId(string id)
        {
            return await _context.Employees.FirstOrDefaultAsync(a => a.AccountId == id);
        }

        public async Task<Employee> GetEmployeeByEmail(string email)
        {
            return await _context.Employees.FirstOrDefaultAsync(a => a.Email == email);
        }

        // Lấy tất cả Employees với các thực thể liên quan
        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees
                .ToListAsync();
        }

        // Thêm một Employee mới
        public async Task<bool> Add(Employee employee)
        {
            try
            {
                await _context.Employees.AddAsync(employee);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Employee
        public async Task<bool> Update(string employeeId, Employee employee)
        {
            var existingEmployee = await GetById(employeeId);
            if (existingEmployee == null) return false;

            existingEmployee.FullName = employee.FullName;
            existingEmployee.Position = employee.Position;
            existingEmployee.HireDate = employee.HireDate;
            existingEmployee.Status = employee.Status;
            existingEmployee.Image = employee.Image;
            existingEmployee.AccountId = employee.AccountId;

            try
            {
                _context.Employees.Update(existingEmployee);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Employee
        public async Task<bool> Delete(string employeeId)
        {
            var employee = await GetById(employeeId);
            if (employee == null) return false;

            try
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Employee>> GetEmployeesByCategoryId(string categoryId)
        {
            // Lấy danh sách nhân viên thuộc CategoryId
            var categoryEmployees = await _context.CategoryEmployees
                .Where(ce => ce.CategoryId == categoryId)
                .ToListAsync();

            if (categoryEmployees == null || categoryEmployees.Count == 0)
                return new List<Employee>();

            // Lấy danh sách EmployeeId từ CategoryEmployee
            var employeeIds = categoryEmployees.Select(ce => ce.EmployeeId).ToList();

            // Lấy thông tin nhân viên từ bảng Employee
            var employees = await _context.Employees
                .Where(e => employeeIds.Contains(e.EmployeeId))
                .ToListAsync();

            return employees;
        }
    }
}
