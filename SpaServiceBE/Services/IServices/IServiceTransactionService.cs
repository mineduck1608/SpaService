using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IServiceTransactionService
    {
        Task<ServiceTransaction> GetById(string svTransId);
        Task<ServiceTransaction> GetByTransId(string transId);
        Task<List<ServiceTransaction>> GetAll();
        Task<bool> Add(ServiceTransaction transaction);
        Task<bool> Delete(string transactionId);
    }

}
