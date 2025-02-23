using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class CustomerMembershipRepository 
    {
        private readonly SpaserviceContext _context;

        public CustomerMembershipRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CustomerMembership>> GetAllAsync() => await _context.CustomerMemberships.ToListAsync();

        public async Task<CustomerMembership> GetCustomerMembershipById(string customerId, string membershipId)
        {
            return await _context.CustomerMemberships.FindAsync(customerId, membershipId);
        }

        public async Task CreateAsync(CustomerMembership entity)
        {
            _context.CustomerMemberships.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(CustomerMembership entity)
        {
            _context.CustomerMemberships.Update(entity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task DeleteAsync(string customerId, string membershipId)
        {
            //var entity = await GetByIdAsync(customerId, membershipId);
            //if (entity != null)
            //{
            //    _context.CustomerMemberships.Remove(entity);
            //    await _context.SaveChangesAsync();
            //}
        }
    }

}
