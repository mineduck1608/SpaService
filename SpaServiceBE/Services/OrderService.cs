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
    public class OrderService : IOrderService
    {
        private readonly OrderRepository _orderRepository;

        public OrderService(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(string id)
        {
            return await _orderRepository.GetByIdAsync(id);
        }

        public async Task AddOrderAsync(Order order)
        {
            await _orderRepository.AddAsync(order);
        }

        public async Task<bool> UpdateOrderAsync(string id, Order order)
        {
           return await _orderRepository.UpdateAsync(id, order);
        }

        public async Task DeleteOrderAsync(string id)
        {
            await _orderRepository.DeleteAsync(id);
        }
        //get 
        public async Task<List<Order>> GetOrderByCustomerIdAsync(string id)
        {
            return await _orderRepository.GetByCustomerIdAsync(id);
        }

        public async Task<List<Order>> GetAllPaidOrdersByCustomerId(string customerId)
        {
            return  await _orderRepository.GetAllPaidOrdersByCustomerId(customerId);
        }
    }
}
