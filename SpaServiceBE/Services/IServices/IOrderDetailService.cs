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
        Task<IEnumerable<OrderDetail>> GetAll();
        Task<OrderDetail> GetById(int id);
        Task Create(OrderDetail item);
        Task Update(OrderDetail item);
        Task Delete(int id);
    }
}
