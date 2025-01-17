using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IAccountService
    {
        Task<Account> GetAccountByLoginAsync(string username, string password);
        Task<Account> GetAccountByIdAsync(string accountId);
        Task<List<Account>> GetAllAccountsAsync();
        Task<bool> AddAccountAsync(Account account);
        Task<bool> UpdateAccountAsync(Account account, string accountId);
        Task<bool> DeleteAccountAsync(string accountId);
    }
}
