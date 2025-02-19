using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class CommissionRepository
    {
        private readonly SpaserviceContext _context;

        public CommissionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Commission theo ID
        public async Task<Commission> GetById(string commissionId)
        {
            return await _context.Commissions
                .Include(c => c.EmployeeCommissions)  // Bao gồm EmployeeCommissions liên quan đến Commission
                .FirstOrDefaultAsync(c => c.CommissionId == commissionId);
        }

        // Lấy tất cả Commissions
        public async Task<List<Commission>> GetAll()
        {
            return await _context.Commissions
                .Include(c => c.EmployeeCommissions)  // Bao gồm EmployeeCommissions liên quan đến Commission
                .ToListAsync();
        }

        // Thêm một Commission mới
        public async Task<bool> Add(Commission commission)
        {
            try
            {
                await _context.Commissions.AddAsync(commission);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Commission
        public async Task<bool> Update(string commissionId, Commission commission)
        {
            var existingCommission = await GetById(commissionId);
            if (existingCommission == null) return false;

            existingCommission.Percentage = commission.Percentage;

            try
            {
                _context.Commissions.Update(existingCommission);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Commission
        public async Task<bool> Delete(string commissionId)
        {
            var commission = await GetById(commissionId);
            if (commission == null) return false;

            try
            {
                _context.Commissions.Remove(commission);
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
