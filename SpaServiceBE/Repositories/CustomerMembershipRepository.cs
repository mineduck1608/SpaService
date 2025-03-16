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
        public async Task<IEnumerable<CustomerMembership>> GetByCusId(string id) 
            => await _context.CustomerMemberships
            .Where(x => x.CustomerId == id)
            .Include(x => x.Membership)
            .ToListAsync();

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

        public async Task<CustomerMembership> FindNewestByCustomerId(string id)
        {
            return await _context.CustomerMemberships.FirstOrDefaultAsync(a => a.CustomerId == id && a.EndDate == null);
            
        }

        public async Task DeleteAsync(string customerId, string membershipId)
        {
            var entity = await GetCustomerMembershipById(customerId, membershipId);
            if (entity != null)
            {
                _context.CustomerMemberships.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<CustomerMembership> GetCustomerMembershipByCustomerId(string customerId)
        {
            return await _context.CustomerMemberships.Include(x => x.Membership).FirstOrDefaultAsync(cm => cm.CustomerId == customerId);
        }

        public async Task<float> GetTotalPaymentByCustomerIdAsync(string customerId)
        {
            var serviceTotal = _context.ServiceTransactions
                .Where(st => st.Request.CustomerId == customerId)
                .Sum(st => st.Transaction.TotalPrice);

            var cosmeticTotal = _context.CosmeticTransactions
                .Where(ct => ct.Order.CustomerId == customerId)
                .Sum(ct => ct.Transaction.TotalPrice);

            return serviceTotal + cosmeticTotal;
        }

        public async Task<Membership?> GetSuitableMembershipAsync(float totalPayment)
        {
            return await _context.Memberships
                .Where(m => totalPayment >= m.TotalPayment)
                .OrderByDescending(m => m.TotalPayment)
                .FirstOrDefaultAsync();
        }

        public async Task<CustomerMembership?> GetCustomerMembershipAsync(string customerId)
        {
            return await _context.CustomerMemberships
                .FirstOrDefaultAsync(cm => cm.CustomerId == customerId);
        }

        public async Task UpdateCustomerMembershipAsync(CustomerMembership customerMembership)
        {
            _context.CustomerMemberships.Update(customerMembership);
            await _context.SaveChangesAsync();
        }

        public async Task CreateCustomerMembershipAsync(CustomerMembership customerMembership)
        {
            try
            {
                _context.CustomerMemberships.Add(customerMembership);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {

            }
        }
    }

}
