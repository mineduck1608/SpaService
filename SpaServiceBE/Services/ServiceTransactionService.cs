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
    public class ServiceTransactionService : IServiceTransactionService
    {
        private readonly ServiceTransactionRepository _repository;

        public ServiceTransactionService(ServiceTransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ServiceTransaction>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<ServiceTransaction> GetByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task CreateAsync(ServiceTransaction serviceTransaction)
        {
            await _repository.CreateAsync(serviceTransaction);
        }

        public async Task <bool> UpdateAsync(string id, ServiceTransaction serviceTransaction)
        {
           return await _repository.UpdateAsync(id, serviceTransaction);
        }

        public async Task DeleteAsync(string id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
