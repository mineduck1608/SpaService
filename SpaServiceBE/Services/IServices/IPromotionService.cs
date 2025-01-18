using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories.Entities;

namespace Services
{
    public interface IPromotionService
    {
        Task<Promotion> GetById(string promotionId);
        Task<List<Promotion>> GetAll();
        Task<bool> Add(Promotion promotion);
        Task<bool> Update(string promotionId, Promotion promotion);
        Task<bool> Delete(string promotionId);
    }
}
