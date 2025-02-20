using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class SpaServiceRepository
    {
        private readonly SpaserviceContext _context;

        public SpaServiceRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy SpaService theo ID với các thông tin liên quan đến Category, Feedback, và Request
        public async Task<SpaService> GetById(string serviceId)
        {
            return await _context.SpaServices
                .FirstOrDefaultAsync(s => s.ServiceId == serviceId);
        }

        public async Task<SpaService> GetByName(string serviceName)
        {
            return await _context.SpaServices
                .FirstOrDefaultAsync(s => s.ServiceName == serviceName);
        }



        // Lấy tất cả SpaServices với các thông tin liên quan đến Category, Feedback, và Request
        public async Task<List<SpaService>> GetAll()
        {
            return await _context.SpaServices
                .Include(s => s.Category)    // Bao gồm thông tin Category liên quan
                .Include(s => s.Feedbacks)   // Bao gồm các Feedback liên quan đến dịch vụ
                //.Include(s => s.Requests)    // Bao gồm các Request liên quan đến dịch vụ
                .ToListAsync();
        }

        // Thêm một SpaService mới
        public async Task<bool> Add(SpaService spaService)
        {
            try
            {
                await _context.SpaServices.AddAsync(spaService);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật SpaService
        public async Task<bool> Update(string serviceId, SpaService spaService)
        {
            var existingService = await GetById(serviceId);
            if (existingService == null) return false;

            existingService.ServiceName = spaService.ServiceName;
            existingService.Price = spaService.Price;
            existingService.Duration = spaService.Duration;
            existingService.Description = spaService.Description;
            existingService.ServiceImage = spaService.ServiceImage;
            existingService.CategoryId = spaService.CategoryId;

            try
            {
                _context.SpaServices.Update(existingService);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa SpaService
        public async Task<bool> Delete(string serviceId)
        {
            var service = await GetById(serviceId);
            if (service == null) return false;

            try
            {
                _context.SpaServices.Remove(service);
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
