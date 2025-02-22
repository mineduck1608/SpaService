using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class RequestRepository
    {
        private readonly SpaserviceContext _context;

        public RequestRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Request theo ID với các thực thể liên quan
        public async Task<Request> GetById(string requestId)
        {
            return await _context.Requests
                .Include(r => r.Appointments)   // Bao gồm các Appointments liên quan đến Request
                .Include(r => r.Customer)       // Bao gồm Customer liên quan đến Request
                .Include(r => r.Service)        // Bao gồm SpaService liên quan đến Request
                .FirstOrDefaultAsync(r => r.RequestId == requestId);
        }

        // Lấy tất cả Requests với các thực thể liên quan
        public async Task<List<Request>> GetAll()
        {
            return await _context.Requests
                .Include(r => r.Appointments)   // Bao gồm các Appointments liên quan đến Request
                .Include(r => r.Customer)       // Bao gồm Customer liên quan đến Request
                .Include(r => r.Service)        // Bao gồm SpaService liên quan đến Request
                .ToListAsync();
        }

        // Thêm một Request mới
        public async Task<bool> Add(Request request)
        {
            try
            {
                await _context.Requests.AddAsync(request);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Request
        public async Task<bool> Update(string requestId, Request request)
        {
            var existingRequest = await GetById(requestId);
            if (existingRequest == null) return false;

            existingRequest.StartTime = request.StartTime;
  
            existingRequest.Status = request.Status;
            existingRequest.CustomerNote = request.CustomerNote;
            existingRequest.ManagerNote = request.ManagerNote;
            existingRequest.ServiceId = request.ServiceId;
            existingRequest.CustomerId = request.CustomerId;

            try
            {
                _context.Requests.Update(existingRequest);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Request
        public async Task<bool> Delete(string requestId)
        {
            var request = await GetById(requestId);
            if (request == null) return false;

            try
            {
                _context.Requests.Remove(request);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<List<Request>> FilterByAccount(string accId)
        {
            return await _context.Requests.Include(x => x.Customer)
                .ThenInclude(x => x.Account)
                .Include(x => x.Service)
                .Include(x => x.Employee)
                .Where(x => x.Customer.AccountId == accId)
                .ToListAsync();
        }
    }
}
