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
    public class ServiceTransactionService: IServiceTransactionService
    {
        private readonly ServiceTransactionRepository repository;
        public ServiceTransactionService(ServiceTransactionRepository repository)
        {
            repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        public async Task<ServiceTransaction> GetById(string svTransId)
        {
            return await repository.GetById(svTransId);
        }

        public async Task<ServiceTransaction> GetByTransId(string transId)
        {
            return await repository.GetByTransId(transId);
        }

        public async Task<List<ServiceTransaction>> GetAll()
        {
            return await repository.GetAll();
        }

        public async Task<bool> Add(ServiceTransaction transaction)
        {
            return await repository.Add(transaction);
        }

        public async Task<bool> Delete(string transactionId)
        {
            return await repository.Delete(transactionId);
        }
    }

}

