using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class TransactionRepository
    {
        private readonly SpaserviceContext _context;

        public TransactionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Transaction theo ID với các thông tin liên quan như Appointment, EmployeeCommission, Membership, Promotion
        public async Task<Transaction> GetById(string transactionId)
        {
            return await _context.Transactions
                     // Bao gồm thông tin Promotion liên quan đến giao dịch
                .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
        }

        // Lấy tất cả các Transaction với các thông tin liên quan
        public async Task<List<Transaction>> GetAll()
        {
            return await _context.Transactions
                .ToListAsync();
        }

        // Thêm một Transaction mới
        public async Task<bool> Add(Transaction transaction)
        {
            try
            {
                await _context.Transactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật thông tin của một Transaction
        public async Task<bool> Update(string transactionId, Transaction transaction)
        {
            var existingTransaction = await GetById(transactionId);
            if (existingTransaction == null) return false;

            existingTransaction.TransactionType = transaction.TransactionType;
            existingTransaction.TotalPrice = transaction.TotalPrice;
            existingTransaction.Status = transaction.Status;
            existingTransaction.PromotionId = transaction.PromotionId;
            existingTransaction.MembershipId = transaction.MembershipId;

            try
            {
                _context.Transactions.Update(existingTransaction);
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
                _context.Transactions.Remove(transaction);
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
