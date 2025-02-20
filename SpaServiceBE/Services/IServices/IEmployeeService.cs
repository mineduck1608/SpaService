using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IEmployeeService
    {
        Task<Employee> GetEmployeeById(string employeeId);
        Task<List<Employee>> GetAllEmployees();
        Task<bool> AddEmployee(Employee employee);
        Task<bool> UpdateEmployee(string employeeId, Employee employee);
        Task<bool> DeleteEmployee(string employeeId);

        Task<Employee> GetEmployeeByPhone(string phone);


        Task<Employee> GetEmployeeByEmail(string email);
        Task<List<Employee>> GetEmployeesByCategoryIdAsync(string categoryId);
        Task<Employee> GetEmployeeByAccountId(string id);
    }
}
