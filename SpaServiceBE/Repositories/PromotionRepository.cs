using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class PromotionRepository
    {
        private readonly SpaserviceContext _context;

        public PromotionRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy PromotionCode theo ID với các thực thể liên quan
        public async Task<Promotion> GetById(string promotionId)
        {
            return await _context.Promotions
                .Include(p => p.Transactions)   // Bao gồm Transactions liên quan đến PromotionCode
                .FirstOrDefaultAsync(p => p.PromotionId == promotionId);
        }

        // Lấy tất cả Promotions với các thực thể liên quan
        public async Task<List<Promotion>> GetAll()
        {
            return await _context.Promotions
                .Where(p =>p.IsActive) // only include active promotion
                .Include(p => p.Transactions)   // Bao gồm Transactions liên quan đến Promotion
                .ToListAsync();
        }

        // Thêm một PromotionCode mới
        public async Task<bool> Add(Promotion promotion)
        {
            try
            {
                await _context.Promotions.AddAsync(promotion);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật PromotionCode
        public async Task<bool> Update(string promotionId, Promotion promotion)
        {
            var existingPromotion = await GetById(promotionId);
            if (existingPromotion == null) return false;

            existingPromotion.DiscountValue = promotion.DiscountValue;
            existingPromotion.PromotionCode = promotion.PromotionCode;
            existingPromotion.PromotionName = promotion.PromotionName;
            existingPromotion.IsActive = promotion.IsActive;

            try
            {
                _context.Promotions.Update(existingPromotion);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa PromotionCode
        public async Task<bool> Delete(string promotionId)
        {
            var promotion = await GetById(promotionId);
            if (promotion == null) return false;

            try
            {
                _context.Promotions.Remove(promotion);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<Promotion> GetByCode(string code)
        {
            return _context.Promotions.FirstOrDefault(x => x.PromotionCode == code && x.IsActive);
        }
    }
}
