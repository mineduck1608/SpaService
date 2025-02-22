using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICosmeticTransactionService
    {
        Task<IEnumerable<CosmeticTransaction>> GetAllAsync();
        Task<CosmeticTransaction> GetByIdAsync(string id);
        Task CreateAsync(CosmeticTransaction transaction);
        Task UpdateAsync(CosmeticTransaction transaction);
        Task DeleteAsync(string id);
    }
}
