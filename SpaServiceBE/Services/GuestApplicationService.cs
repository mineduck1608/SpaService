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
    public class GuestApplicationService : IGuestApplicationService
    {
        private readonly GuestApplicationRepository _repository;

        public GuestApplicationService(GuestApplicationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<GuestApplication>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<GuestApplication> GetByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(GuestApplication guestApplication)
        {
            await _repository.AddAsync(guestApplication);
        }

        public async Task<bool> UpdateAsync(GuestApplication guestApplication)
        {
          return  await _repository.UpdateAsync(guestApplication);
        }

        public async Task DeleteAsync(string id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
