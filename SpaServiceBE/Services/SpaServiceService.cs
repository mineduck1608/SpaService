using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Repositories.DTO;
using Repositories.Entities;
using Services.IServices;

namespace Services
{
    public class SpaServiceContext : ISpaServiceService
    {
        private readonly SpaServiceRepository _spaServiceRepository;

        public SpaServiceContext(SpaServiceRepository spaServiceRepository)
        {
            _spaServiceRepository = spaServiceRepository;
        }

        public async Task<SpaService> GetById(string serviceId)
        {
            return await _spaServiceRepository.GetById(serviceId);
        }

        public async Task<TimeOnly> GetTimeByServiceId(string serviceId)
        {
            var duration = await _spaServiceRepository.GetById(serviceId);
            return duration.Duration;
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

        public Dictionary<string, ServiceStatistic> GetServiceStatistic(DateTime lower)
        {
            return _spaServiceRepository.GetServicesStats(lower);
        }

        public async Task<List<SpaService>> GetEverything()
        {
            return await _spaServiceRepository.GetEverything();
        }
    }
}
