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

        public async Task<Account> GetAccountByLogin(string username, string password)
        {
            return await _repository.GetAccountByLogin(username, password);
        }

        public async Task<Account> GetAccountById(string accountId)
        {
            return await _repository.GetAccountById(accountId);
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            return await _repository.GetAllAccounts();
        }

        public async Task<bool> AddAccount(Account account)
        {
            return await _repository.AddAccount(account);
        }

        public async Task<bool> UpdateAccount(Account account, string accountId)
        {
            return await _repository.UpdateAccount(account, accountId);
        }

        public async Task<bool> DeleteAccount(string accountId)
        {
            return await _repository.DeleteAccount(accountId);
        }
    }
}
