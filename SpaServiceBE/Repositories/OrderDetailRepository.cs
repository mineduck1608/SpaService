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
    public class OrderDetailRepository
    {
        private readonly SpaserviceContext _context;

        public OrderDetailRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderDetail>> GetAll()
        {
            return await _context.OrderDetails.ToListAsync();
        }

        public async Task<OrderDetail> GetById(int id)
        {
            return await _context.OrderDetails.FindAsync(id);
        }

        public async Task Create(OrderDetail item)
        {
            _context.OrderDetails.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task Update(OrderDetail item)
        {
            _context.OrderDetails.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = await _context.OrderDetails.FindAsync(id);
            if (item != null)
            {
                _context.OrderDetails.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}
