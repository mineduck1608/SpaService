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
    public class CosmeticTransactionService : ICosmeticTransactionService
    {
        private readonly CosmeticTransactionRepository _repository;

        public CosmeticTransactionService(CosmeticTransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CosmeticTransaction>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CosmeticTransaction> GetByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task CreateAsync(CosmeticTransaction transaction)
        {
            await _repository.CreateAsync(transaction);
        }

        public async Task UpdateAsync(CosmeticTransaction transaction)
        {
            await _repository.UpdateAsync(transaction);
        }

        public async Task DeleteAsync(string id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
