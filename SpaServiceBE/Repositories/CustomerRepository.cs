using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class CustomerRepository
    {
        private readonly SpaserviceContext _context;

        public CustomerRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Customer theo ID với các thực thể liên quan
        public async Task<Customer> GetById(string customerId)
        {
            return await _context.Customers
                .Include(c => c.Account)        // Bao gồm Account liên quan đến Customer
                .Include(c => c.Feedbacks)      // Bao gồm Feedbacks liên quan đến Customer
                .Include(c => c.Membership)     // Bao gồm Membership liên quan đến Customer
                .Include(c => c.Requests)       // Bao gồm Requests liên quan đến Customer
                .FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        // Lấy tất cả Customers với các thực thể liên quan
        public async Task<List<Customer>> GetAll()
        {
            return await _context.Customers
                .Include(c => c.Account)        // Bao gồm Account liên quan đến Customer
                .Include(c => c.Feedbacks)      // Bao gồm Feedbacks liên quan đến Customer
                .Include(c => c.Membership)     // Bao gồm Membership liên quan đến Customer
                .Include(c => c.Requests)       // Bao gồm Requests liên quan đến Customer
                .ToListAsync();
        }

        public async Task<Customer> GetCustomerByPhone(string phone)
        {
            return await _context.Customers.FirstOrDefaultAsync(a => a.Phone == phone);
        }

        public async Task<Customer> GetCustomerByEmail(string email)
        {
            return await _context.Customers.FirstOrDefaultAsync(a => a.Email == email);
        }

        // Thêm một Customer mới
        public async Task<bool> Add(Customer customer)
        {
            try
            {
                await _context.Customers.AddAsync(customer);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Customer
        public async Task<bool> Update(string customerId, Customer customer)
        {
            var existingCustomer = await GetById(customerId);
            if (existingCustomer == null) return false;

            existingCustomer.FullName = customer.FullName;
            existingCustomer.Gender = customer.Gender;
            existingCustomer.Phone = customer.Phone;
            existingCustomer.Email = customer.Email;
            existingCustomer.DateOfBirth = customer.DateOfBirth;
            existingCustomer.MembershipId = customer.MembershipId;

            try
            {
                _context.Customers.Update(existingCustomer);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Customer
        public async Task<bool> Delete(string customerId)
        {
            var customer = await GetById(customerId);
            if (customer == null) return false;

            try
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<Customer> GetByAccId(string accId)
        {
            return await _context.Customers.FirstOrDefaultAsync(x => x.AccountId == accId);
        }
    }
}
