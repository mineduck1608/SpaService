using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(string id);
        Task AddOrderAsync(Order order);
        Task<bool> UpdateOrderAsync(string id, Order order);
        Task DeleteOrderAsync(string id);
        Task <List<Order>> GetOrderByCustomerIdAsync(string customerId);
    }
}
