﻿using System;
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

                .FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        // Lấy tất cả Customers với các thực thể liên quan
        public async Task<List<Customer>> GetAll()
        {
            return await _context.Customers
                .ToListAsync();
        }

        public async Task<Customer> GetCustomerByPhone(string phone)
        {
            return await _context.Customers.FirstOrDefaultAsync(a => a.Phone == phone);
        }

        public async Task<Customer> GetCustomerByAccountId(string id)
        {
            return await _context.Customers.FirstOrDefaultAsync(a => a.AccountId == id);
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
        public (int total, int newCustomer) NumOfCustomersInTimeframe(DateTime lower, DateTime upper)
        {
            var customers = _context.Customers;
            var total = customers.Count();
            var filtered = customers
                .Include(x => x.Account)
                .Where(x => x.Account.CreatedAt >= lower && x.Account.CreatedAt <= upper);
            return (total, filtered.Count());
        }
        public (int total, int newCustomer) NumOfCustomers(DateTime lower)
        {
            var now = DateTime.Now;
            var customers = _context.Customers;
            var total = customers.Count();
            var filtered = customers
                .Include(x => x.Account)
                .Where(x => x.Account.CreatedAt >= lower);
            return (total, filtered.Count());
        }
    }
}
