using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IEmployeeCommissionService
    {
        Task<EmployeeCommission> GetEmployeeCommissionById(string employeeId, string commissionId, string transactionId);
        Task<List<EmployeeCommission>> GetAllEmployeeCommissions();
        Task<bool> AddEmployeeCommission(EmployeeCommission employeeCommission);
        Task<bool> UpdateEmployeeCommission(string employeeId, string commissionId, string transactionId, EmployeeCommission employeeCommission);
        Task<bool> DeleteEmployeeCommission(string employeeId, string commissionId, string transactionId);
        Task<List<EmployeeCommission>> GetEmployeeCommissions(string employeeId);
    }
}
