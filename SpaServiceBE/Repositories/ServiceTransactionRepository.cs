using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ServiceTransactionRepository
    {
        private readonly SpaserviceContext _context;

        public ServiceTransactionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Transaction theo ID với các thông tin liên quan như Appointment, EmployeeCommission, Membership, PromotionCode
        public async Task<ServiceTransaction> GetById(string svTransId)
        {
            return await _context.ServiceTransactions
                // Bao gồm thông tin PromotionCode liên quan đến giao dịch
                .FirstOrDefaultAsync(t => t.ServiceTransactionId == svTransId);
        }
        public async Task<ServiceTransaction> GetByTransId(string transId)
        {
            return await _context.ServiceTransactions
                // Bao gồm thông tin PromotionCode liên quan đến giao dịch
                .FirstOrDefaultAsync(t => t.TransactionId == transId);
        }
        // Lấy tất cả các Transaction với các thông tin liên quan
        public async Task<List<ServiceTransaction>> GetAll()
        {
            return await _context.ServiceTransactions
                .ToListAsync();
        }

        // Thêm một Transaction mới
        public async Task<bool> Add(ServiceTransaction transaction)
        {
            try
            {
                await _context.ServiceTransactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Transaction theo ID
        public async Task<bool> Delete(string transactionId)
        {
            var transaction = await GetById(transactionId);
            if (transaction == null) return false;

            try
            {
                _context.ServiceTransactions.Remove(transaction);
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
