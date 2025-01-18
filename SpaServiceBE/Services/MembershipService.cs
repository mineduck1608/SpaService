using Repositories;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class MembershipService : IMembershipService
    {
        private readonly MembershipRepository _repository;

        public MembershipService(MembershipRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<Membership> GetMembershipById(string membershipId)
        {
            return await _repository.GetById(membershipId);
        }

        public async Task<List<Membership>> GetAllMemberships()
        {
            return await _repository.GetAll();
        }

        public async Task<bool> AddMembership(Membership membership)
        {
            return await _repository.Add(membership);
        }

        public async Task<bool> UpdateMembership(string membershipId, Membership membership)
        {
            return await _repository.Update(membershipId, membership);
        }

        public async Task<bool> DeleteMembership(string membershipId)
        {
            return await _repository.Delete(membershipId);
        }
    }
}
