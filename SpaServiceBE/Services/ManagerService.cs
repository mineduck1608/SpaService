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
    public class ManagerService : IManagerService
    {
        private readonly ManagerRepository _repository;

        public ManagerService(ManagerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Manager>> GetAllManagers()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Manager> GetManagerById(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<bool> AddManager(Manager manager)
        {
            return await _repository.Add(manager);
        }

        public async Task<bool> UpdateManager(Manager manager)
        {
            return await _repository.UpdateAsync(manager);
        }

        public async Task DeleteManager(string id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<Manager> GetManagerByPhone(string phone)
        {
            return await _repository.GetManagerByPhone(phone);
        }

        public async Task<Manager> GetManagerByEmail(string email)
        {
            return await _repository.GetManagerByEmail(email);
        }
    }
}
