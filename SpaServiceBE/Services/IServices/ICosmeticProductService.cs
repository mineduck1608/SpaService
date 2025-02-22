using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICosmeticProductService
    {
        Task<IEnumerable<CosmeticProduct>> GetAll();
        Task<CosmeticProduct> GetById(string id);
        Task Create(CosmeticProduct item);
        Task Update(CosmeticProduct item);
        Task Delete(string id);
    }
}
