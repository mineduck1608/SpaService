using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class AccountRepository
    {
        private readonly SpaServiceContext _context = null;

        public AccountRepository()
        {
            if (_context == null)
            {
                _context = new SpaServiceContext();
            }
        }

        public AccountRepository(SpaServiceContext context)
        {
            _context = context;
        }

        public List<Account> GetAllAccounts() => _context.Accounts.ToList();

    }
}
