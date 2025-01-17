using Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories
{
    public class AccountRepository
    {
        private readonly SpaServiceContext _context;


        public AccountRepository(SpaServiceContext context)
        {
            _context = context;
        }

        public async Task<Account> GetAccountByLoginAsync(string username, string password)
        {
            return await _context.Accounts
                .FirstOrDefaultAsync(a => a.Username == username && a.Password == password);
        }

        public async Task<Account> GetAccountByIdAsync(string accountId)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.AccountId == accountId);
        }

        public async Task<List<Account>> GetAllAccountsAsync()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task<bool> AddAccountAsync(Account account)
        {
            try
            {
                await _context.Accounts.AddAsync(account);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAccountAsync(Account account, string accountId)
        {
            var existingAccount = await GetAccountByIdAsync(accountId);
            if (existingAccount == null) return false;

            existingAccount.Username = account.Username;
            existingAccount.Password = account.Password;
            existingAccount.Status = account.Status;
            existingAccount.RoleId = account.RoleId;

            try
            {
                _context.Accounts.Update(existingAccount);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteAccountAsync(string accountId)
        {
            var account = await GetAccountByIdAsync(accountId);
            if (account == null) return false;

            try
            {
                _context.Accounts.Remove(account);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
