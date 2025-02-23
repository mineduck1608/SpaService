using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories.Entities;

namespace Services.IServices
{
    public interface ISpaServiceService
    {
        Task<SpaService> GetById(string serviceId);
        Task<List<SpaService>> GetAll();
        Task<bool> Add(SpaService spaService);
        Task<bool> Update(string serviceId, SpaService spaService);
        Task<bool> Delete(string serviceId);
        Task<SpaService> GetByName(string serviceName);
    }
}
