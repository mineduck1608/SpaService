using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IOrderDetailService
    {
        Task<IEnumerable<OrderDetail>> GetAllOrderDetails();
        Task<OrderDetail> GetOrderDetailById(int id);
        Task Create(OrderDetail item);
        Task Update(OrderDetail item);
        Task Delete(int id);
        Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderId(string orderId); // New method for filtering by orderId

    }
}
