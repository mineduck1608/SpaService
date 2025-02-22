using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{

    public interface ICosmeticProductCategoryService
    {
        Task<IEnumerable<CosmeticProductCategory>> GetAll();
        Task<CosmeticProductCategory> GetById(string id);
        Task<bool> Create(CosmeticProductCategory item);
        Task<bool> Update(CosmeticProductCategory item);
        Task Delete(string id);
    }
}
