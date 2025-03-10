using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace Repositories
{
    public class TransactionRepository
    {
        private readonly SpaserviceContext _context;

        public TransactionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Transaction theo ID với các thông tin liên quan như Appointment, EmployeeCommission, Membership, PromotionCode
        public async Task<Transaction> GetById(string transactionId)
        {
            return await _context.Transactions
                     // Bao gồm thông tin PromotionCode liên quan đến giao dịch
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
        public async Task<float> GetTotalRevenue()
        {
            return await _context.Transactions
             .Where(t => t.Status == true) // Assuming 'true' means "Done"
             .SumAsync(t => t.TotalPrice);
        }

        public IEnumerable<float> OrderByMonth()
        {
            var now = DateTime.Now;
            var lower = new DateTime(now.Year - 1, now.Month, 1);
            var month = now.Month;
            var year = now.Year;
            //Get trans 1 year from now
            var trans = _context.Transactions.Where(t =>
            t.Status == true
            && (t.CompleteTime != null && ((DateTime)t.CompleteTime) >= lower)
            ).Select(x => new
            {
                m = x.CompleteTime.GetValueOrDefault().Month,
                y = x.CompleteTime.GetValueOrDefault().Year - year + 1,
                t = x.TotalPrice,
            });
            var buckets = new float[13];
            //Group the transactions by month/year
            foreach (var t in trans)
            {
                int index = t.m + (t.y == 1 ? 12 : 0) - month;
                buckets[index % 13] += t.t;
            }
            return buckets;
        }
        public Dictionary<string, float> OrderByCategory()
        {
            var now = DateTime.Now;
            var lower = new DateTime(now.Year - 1, now.Month, 1);
            var trans = _context.ServiceTransactions
                .Include(x => x.Transaction)
                .Where(x => 
                x.Transaction.Status
                && (x.Transaction.CompleteTime != null && ((DateTime)x.Transaction.CompleteTime) >= lower)
                )
                .Include(x => x.Request)
                .ThenInclude(x => x.Service);
            var result = new Dictionary<string, float>();
            foreach (var t in trans)
            {
                var category = t.Request.Service.CategoryId;
                var amount = t.Transaction.TotalPrice;
                if (result.ContainsKey(category))
                {
                    result[category] += amount;
                }
                else
                {
                    result[category] = amount;
                }
            }
            return result;
        }
    }
}
