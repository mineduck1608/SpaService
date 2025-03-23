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
    public class OrderRepository    
    {
        private readonly SpaserviceContext _context;

        public OrderRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _context.Orders
                .Include(x => x.Customer)
                .ToListAsync();
        }

        public async Task<Order> GetByIdAsync(string id)
        {
            return await _context.Orders
                .Include(x => x.Customer)
                .FirstOrDefaultAsync(x => x.OrderId == id);
        }

        public async Task AddAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(string id, Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder != null)
            {
                _context.Entry(existingOrder).CurrentValues.SetValues(order);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }


        public async Task DeleteAsync(string id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Order>> GetByCustomerIdAsync(string customerId)
        {
            return await _context.Orders
                .Where(o => o.CustomerId == customerId)
                .ToListAsync();
        }

        
        public async Task<List<Order>> GetAllPaidOrdersByCustomerId(string customerId)
                {
                    return await _context.Orders
                        .Where(o => o.CustomerId == customerId)
                        .Where(o => o.Status == "Confirmed")
                        .ToListAsync();
                }
        public async Task<int> GetTotalProcessedOrder()
        {
            return await _context.Orders.Where(o => o.Status == "Confirmed").CountAsync();
        }
        public async Task<int> GetTotalPendingOrder()
        {
            return await _context.Orders.Where(o => o.Status != "Confirmed").CountAsync();
        }
        public async Task<int> GetTotalOrder()
        {
            return await _context.Orders.CountAsync();
        }
    }
}
