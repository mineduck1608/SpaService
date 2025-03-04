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
    public class CustomerMembershipService : ICustomerMembershipService
    {
        private readonly CustomerMembershipRepository _repository;

        public CustomerMembershipService(CustomerMembershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CustomerMembership>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<CustomerMembership> GetCustomerMembershipById(string customerId, string membershipId) => await _repository.GetCustomerMembershipById(customerId, membershipId);
        public async Task CreateAsync(CustomerMembership entity) => await _repository.CreateAsync(entity);
        public async Task<bool> UpdateAsync(CustomerMembership entity) => await _repository.UpdateAsync(entity);
        public async Task DeleteAsync(string customerId, string membershipId) => await _repository.DeleteAsync(customerId, membershipId);
        public async Task<Membership> ClosestMememebrshipOfCustomer(string customerId)
        {
            var memberships = (await _repository.GetByCusId(customerId)).ToList();
            if (memberships.Count() == 0)
            {
                return null;
            }
            DateOnly max = DateOnly.MinValue;

            foreach (var membership in memberships)
            {
                if (membership.StartDate > max)
                {
                    max = membership.StartDate;
                }
            }
            return
        }
    }
}
