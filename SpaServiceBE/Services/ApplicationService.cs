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
    public class ApplicationService : IApplicationService
    {
        private readonly ApplicationRepository _repository;

        public ApplicationService(ApplicationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Application>> GetAllApplicationsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Application> GetApplicationByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task CreateApplicationAsync(Application application)
        {
            await _repository.CreateAsync(application);
        }

        public async Task <bool> UpdateApplicationAsync(Application application)
        {
           return await _repository.UpdateAsync(application);
        }

        public async Task DeleteApplicationAsync(string id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
