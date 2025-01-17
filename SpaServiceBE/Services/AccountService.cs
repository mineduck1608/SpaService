using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class AccountService : IAccountService
    {
        private readonly AccountRepository _repository;

        public AccountService(AccountRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<Account> GetAccountByLoginAsync(string username, string password)
        {
            return await _repository.GetAccountByLoginAsync(username, password);
        }

        public async Task<Account> GetAccountByIdAsync(string accountId)
        {
            return await _repository.GetAccountByIdAsync(accountId);
        }

        public async Task<List<Account>> GetAllAccountsAsync()
        {
            return await _repository.GetAllAccountsAsync();
        }

        public async Task<bool> AddAccountAsync(Account account)
        {
            return await _repository.AddAccountAsync(account);
        }

        public async Task<bool> UpdateAccountAsync(Account account, string accountId)
        {
            return await _repository.UpdateAccountAsync(account, accountId);
        }

        public async Task<bool> DeleteAccountAsync(string accountId)
        {
            return await _repository.DeleteAccountAsync(accountId);
        }
    }
}
