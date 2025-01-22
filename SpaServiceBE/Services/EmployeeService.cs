using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeRepository _repository;

        public EmployeeService(EmployeeRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Lấy Employee theo ID
        public async Task<Employee> GetEmployeeById(string employeeId)
        {
            return await _repository.GetById(employeeId);
        }

        public async Task<Employee> GetEmployeeByPhone(string phone)
        {
            return await _repository.GetEmployeeByPhone(phone);
        }

        public async Task<Employee> GetEmployeeByEmail(string email)
        {
            return await _repository.GetEmployeeByEmail(email);
        }

        // Lấy tất cả Employees
        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _repository.GetAll();
        }

        // Thêm một Employee mới
        public async Task<bool> AddEmployee(Employee employee)
        {
            return await _repository.Add(employee);
        }

        // Cập nhật Employee
        public async Task<bool> UpdateEmployee(string employeeId, Employee employee)
        {
            return await _repository.Update(employeeId, employee);
        }

        // Xóa Employee
        public async Task<bool> DeleteEmployee(string employeeId)
        {
            return await _repository.Delete(employeeId);
        }
    }
}
