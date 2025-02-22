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
        Task<IEnumerable<ServiceTransaction>> GetAllAsync();
        Task<ServiceTransaction> GetByIdAsync(string id);
        Task CreateAsync(ServiceTransaction serviceTransaction);
        Task <bool> UpdateAsync(string id, ServiceTransaction serviceTransaction);
        Task DeleteAsync(string id);
    }
}
