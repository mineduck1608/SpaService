using Repositories;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class ComissionService : IComissionService
    {
        private readonly CommissionRepository _repository;

        public ComissionService(CommissionRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Get a Commission by ID
        public async Task<Commission> GetCommissionById(string commissionId)
        {
            return await _repository.GetById(commissionId);
        }

        // Get all Commissions
        public async Task<List<Commission>> GetAllCommissions()
        {
            return await _repository.GetAll();
        }

        // Add a new Commission
        public async Task<bool> AddCommission(Commission commission)
        {
            return await _repository.Add(commission);
        }

        // Update an existing Commission
        public async Task<bool> UpdateCommission(string commissionId, Commission commission)
        {
            return await _repository.Update(commissionId, commission);
        }

        // Delete a Commission
        public async Task<bool> DeleteCommission(string commissionId)
        {
            return await _repository.Delete(commissionId);
        }
    }
}
