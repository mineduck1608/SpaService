using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class EmployeeCommissionRepository
    {
        private readonly SpaserviceContext _context;

        public EmployeeCommissionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy EmployeeCommission theo ID với các thực thể liên quan
        public async Task<EmployeeCommission> GetById(string employeeId, string commissionId, string transactionId)
        {
            return await _context.EmployeeCommissions
                .Include(ec => ec.Commission)          // Bao gồm Commission liên quan đến EmployeeCommission
                .Include(ec => ec.Employee)            // Bao gồm Employee liên quan đến EmployeeCommission
                .Include(ec => ec.Transaction)         // Bao gồm Transaction liên quan đến EmployeeCommission
                .FirstOrDefaultAsync(ec => ec.EmployeeId == employeeId &&
                                           ec.CommissionId == commissionId &&
                                           ec.TransactionId == transactionId);
        }

        // Lấy tất cả EmployeeCommissions với các thực thể liên quan
        public async Task<List<EmployeeCommission>> GetAll()
        {
            return await _context.EmployeeCommissions
                .Include(ec => ec.Commission)          // Bao gồm Commission liên quan đến EmployeeCommission
                .Include(ec => ec.Employee)            // Bao gồm Employee liên quan đến EmployeeCommission
                .Include(ec => ec.Transaction)         // Bao gồm Transaction liên quan đến EmployeeCommission
                .ToListAsync();
        }

        // Thêm một EmployeeCommission mới
        public async Task<bool> Add(EmployeeCommission employeeCommission)
        {
            try
            {
                await _context.EmployeeCommissions.AddAsync(employeeCommission);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật EmployeeCommission
        public async Task<bool> Update(string employeeId, string commissionId, string transactionId, EmployeeCommission employeeCommission)
        {
            var existingEmployeeCommission = await GetById(employeeId, commissionId, transactionId);
            if (existingEmployeeCommission == null) return false;

            existingEmployeeCommission.CommissionValue = employeeCommission.CommissionValue;

            try
            {
                _context.EmployeeCommissions.Update(existingEmployeeCommission);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa EmployeeCommission
        public async Task<bool> Delete(string employeeId, string commissionId, string transactionId)
        {
            var employeeCommission = await GetById(employeeId, commissionId, transactionId);
            if (employeeCommission == null) return false;

            try
            {
                _context.EmployeeCommissions.Remove(employeeCommission);
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
