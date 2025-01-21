using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IAccountService
    {
        Task<Account> GetAccountByLogin(string username, string password);
        Task<Account> GetAccountById(string accountId);
        Task<List<Account>> GetAllAccounts();

        Task<Account> GetAccountByUsername(string username);
        Task<bool> AddAccount(Account account);
        Task<bool> UpdateAccount(Account account, string accountId);
        Task<bool> DeleteAccount(string accountId);
    }
}
