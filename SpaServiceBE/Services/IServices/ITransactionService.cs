using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories.Entities;

namespace Services
{
    public interface ITransactionService
    {
        Task<Transaction> GetById(string transactionId);
        Task<List<Transaction>> GetAll();
        Task<bool> Add(Transaction transaction);
        Task<bool> Update(string transactionId, Transaction transaction);
        Task<bool> Delete(string transactionId);
    }
}
