using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IComissionService
    {
        Task<Commission> GetCommissionById(string commissionId);
        Task<List<Commission>> GetAllCommissions();
        Task<bool> AddCommission(Commission commission);
        Task<bool> UpdateCommission(string commissionId, Commission commission);
        Task<bool> DeleteCommission(string commissionId);
    }
}
