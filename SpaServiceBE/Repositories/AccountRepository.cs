using Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Context;
using Microsoft.Identity.Client;

namespace Repositories
{
    public class AccountRepository
    {
        private readonly SpaserviceContext _context;


        public AccountRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<Account> GetAccountByLogin(string username, string password)
        {
            return await _context.Accounts.Include(a => a.Role).FirstOrDefaultAsync(a => a.Username == username && a.Password == password);
        }

        public async Task<Account> GetAccountById(string accountId)
        {
            return await _context.Accounts.Include(a => a.Role).Include(e => e.Employees).FirstOrDefaultAsync(a => a.AccountId == accountId);
        }

        public async Task<Account> GetByUsername(string username)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.Username == username);
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task<bool> AddAccount(Account account)
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

        public async Task<bool> UpdateAccount(Account account, string accountId)
        {
            var existingAccount = await GetAccountById(accountId);
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

        public async Task<bool> DeleteAccount(string accountId)
        {
            var account = await GetAccountById(accountId);
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
