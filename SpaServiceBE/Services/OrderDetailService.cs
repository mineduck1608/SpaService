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
    public class OrderDetailService : IOrderDetailService
    {
        private readonly OrderDetailRepository _repository;

        public OrderDetailService(OrderDetailRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<OrderDetail>> GetAllOrderDetails()
        {
            return await _repository.GetAllOrderDetails();
        }

        public async Task<OrderDetail> GetOrderDetailById(int id)
        {
            return await _repository.GetOrderDetailById(id);
        }

        public async Task Create(OrderDetail item)
        {
            await _repository.Create(item);
        }

        public async Task Update(OrderDetail item)
        {
            await _repository.Update(item);
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderId(string orderId)
        {
            return await _repository.GetOrderDetailsByOrderId(orderId); // Call repository method to get order details by orderId
        }
    }
}
