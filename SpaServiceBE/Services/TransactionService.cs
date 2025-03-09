using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Repositories.Entities;
using Services.IServices;

namespace Services
{
    public class TransactionService : ITransactionService
    {
        private readonly TransactionRepository _transactionRepository;

        public TransactionService(TransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<Transaction> GetById(string transactionId)
        {
            return await _transactionRepository.GetById(transactionId);
        }

        public async Task<List<Transaction>> GetAll()
        {
            return await _transactionRepository.GetAll();
        }

        public async Task<bool> Add(Transaction transaction)
        {
            return await _transactionRepository.Add(transaction);
        }

        public async Task<bool> Update(string transactionId, Transaction transaction)
        {
            return await _transactionRepository.Update(transactionId, transaction);
        }

        public async Task<bool> Delete(string transactionId)
        {
            return await _transactionRepository.Delete(transactionId);
        }
        public async Task<float> GetTotalRevenue()
        {
            return await _transactionRepository.GetTotalRevenue();
        }

        public async Task<IEnumerable<float>> OrderByMonths()
        {
            return await _transactionRepository.OrderByMonth();
        }
    }
}
