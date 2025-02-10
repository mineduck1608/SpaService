using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Repositories.Entities;

namespace Services
{
    public class SpaServiceService : ISpaServiceService
    {
        private readonly SpaServiceRepository _spaServiceRepository;

        public SpaServiceService(SpaServiceRepository spaServiceRepository)
        {
            _spaServiceRepository = spaServiceRepository;
        }

        public async Task<SpaService> GetById(string serviceId)
        {
            return await _spaServiceRepository.GetById(serviceId);
        }

        public async Task<SpaService> GetByName(string serviceName)
        {
            return await _spaServiceRepository.GetByName(serviceName);
        }

        public async Task<List<SpaService>> GetAll()
        {
            return await _spaServiceRepository.GetAll();
        }

        public async Task<bool> Add(SpaService spaService)
        {
            return await _spaServiceRepository.Add(spaService);
        }

        public async Task<bool> Update(string serviceId, SpaService spaService)
        {
            return await _spaServiceRepository.Update(serviceId, spaService);
        }

        public async Task<bool> Delete(string serviceId)
        {
            return await _spaServiceRepository.Delete(serviceId);
        }
    }
}
