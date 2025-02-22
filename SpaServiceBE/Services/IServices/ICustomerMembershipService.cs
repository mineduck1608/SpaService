using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICustomerMembershipService
    {
        Task<IEnumerable<CustomerMembership>> GetAllAsync();
        Task<CustomerMembership> GetByIdAsync(string customerId, string membershipId);
        Task CreateAsync(CustomerMembership entity);
        Task<bool> UpdateAsync(CustomerMembership entity);
        Task DeleteAsync(string customerId, string membershipId);
    }
}
