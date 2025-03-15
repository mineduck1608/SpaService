using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class EmployeeCommissionService : IEmployeeCommissionService
    {
        private readonly EmployeeCommissionRepository _repository;

        public EmployeeCommissionService(EmployeeCommissionRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Lấy EmployeeCommission theo ID
        public async Task<EmployeeCommission> GetEmployeeCommissionById(string employeeId, string commissionId, string transactionId)
        {
            return await _repository.GetById(employeeId, commissionId, transactionId);
        }

        // Lấy tất cả EmployeeCommissions
        public async Task<List<EmployeeCommission>> GetAllEmployeeCommissions()
        {
            return await _repository.GetAll();
        }

        public async Task<List<EmployeeCommission>> GetEmployeeCommissions(string employeeId)
        {
            return await _repository.GetEmployeeCommission(employeeId);
        }

        // Thêm một EmployeeCommission mới
        public async Task<bool> AddEmployeeCommission(EmployeeCommission employeeCommission)
        {
            return await _repository.Add(employeeCommission);
        }

        // Cập nhật EmployeeCommission
        public async Task<bool> UpdateEmployeeCommission(string employeeId, string commissionId, string transactionId, EmployeeCommission employeeCommission)
        {
            return await _repository.Update(employeeId, commissionId, transactionId, employeeCommission);
        }

        // Xóa EmployeeCommission
        public async Task<bool> DeleteEmployeeCommission(string employeeId, string commissionId, string transactionId)
        {
            return await _repository.Delete(employeeId, commissionId, transactionId);
        }
    }
}
