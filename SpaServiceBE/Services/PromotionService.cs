using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Entities;
using Services.IServices;

namespace Services
{
    public class PromotionService : IPromotionService
    {
        private readonly PromotionRepository _promotionRepository;

        public PromotionService(PromotionRepository promotionRepository)
        {
            _promotionRepository = promotionRepository;
        }

        public async Task<Promotion> GetById(string promotionId)
        {
            return await _promotionRepository.GetById(promotionId);
        }

        public async Task<List<Promotion>> GetAll()
        {
            return await _promotionRepository.GetAll();
        }

        public async Task<bool> Add(Promotion promotion)
        {
            return await _promotionRepository.Add(promotion);
        }

        public async Task<bool> Update(string promotionId, Promotion promotion)
        {
            return await _promotionRepository.Update(promotionId, promotion);
        }

        public async Task<bool> Delete(string promotionId)
        {
            return await _promotionRepository.Delete(promotionId);
        }

        public async Task<Promotion> GetByCode(string code)
        {
            return await _promotionRepository.GetByCode(code);
        }

        public async Task<bool> IsPromotionUsed(string customerId, string code)
        {
            return await _promotionRepository.IsPromotionUsed(customerId, code);
        }

    }
}
