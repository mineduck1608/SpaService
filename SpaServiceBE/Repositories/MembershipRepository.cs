using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class MembershipRepository
    {
        private readonly SpaserviceContext _context;

        public MembershipRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Membership theo ID với các thực thể liên quan
        public async Task<Membership> GetById(string membershipId)
        {
            return await _context.Memberships
                .FirstOrDefaultAsync(m => m.MembershipId == membershipId);
        }

        // Lấy tất cả Memberships với các thực thể liên quan
        public async Task<List<Membership>> GetAll()
        {
            return await _context.Memberships
                .ToListAsync();
        }

        // Thêm một Membership mới
        public async Task<bool> Add(Membership membership)
        {
            try
            {
                await _context.Memberships.AddAsync(membership);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Membership
        public async Task<bool> Update(string membershipId, Membership membership)
        {
            var existingMembership = await GetById(membershipId);
            if (existingMembership == null) return false;

            // First, determine the membership type and discount based on total payment
            if (existingMembership.TotalPayment >= 100000000)
            {
                existingMembership.Type = "Diamond";
                existingMembership.Discount = 10;
            }
            else if (existingMembership.TotalPayment >= 60000000)
            {
                existingMembership.Type = "Platinum";
                existingMembership.Discount = 7;
            }
            else if (existingMembership.TotalPayment >= 30000000)
            {
                existingMembership.Type = "Gold";
                existingMembership.Discount = 5;
            }
            else if (existingMembership.TotalPayment >= 10000000)
            {
                existingMembership.Type = "Silver";
                existingMembership.Discount = 2;
            }

            // Then update with provided values if necessary
                existingMembership.TotalPayment = membership.TotalPayment;
                existingMembership.Type = membership.Type;
                existingMembership.Discount = membership.Discount;

            try
            {
                _context.Memberships.Update(existingMembership);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Membership
        public async Task<bool> Delete(string membershipId)
        {
            var membership = await GetById(membershipId);
            if (membership == null) return false;

            try
            {
                _context.Memberships.Remove(membership);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
