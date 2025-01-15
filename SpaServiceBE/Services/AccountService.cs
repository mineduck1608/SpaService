using Repositories;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AccountService : IAccountService
    {
        private readonly AccountRepository _repo = null;

        public AccountService()
        {
            if (_repo == null)
                _repo = new AccountRepository();
        }
        public List<Account> GetAllAccounts() => _repo.GetAllAccounts();
    }
}
