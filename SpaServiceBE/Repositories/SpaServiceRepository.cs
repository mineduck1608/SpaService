using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;
using Repositories.DTO;

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
                .Where(s => !s.IsDeleted) // not include service has been deleted
                .Include(s => s.Category)    // Bao gồm thông tin Category liên quan
                                             //.Include(s => s.Requests)    // Bao gồm các Request liên quan đến dịch vụ
                .ToListAsync();
        }
        public async Task<List<SpaService>> GetEverything()
        {
            return await _context.SpaServices
                .Include(s => s.Category)
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
        public Dictionary<string, ServiceStatistic> GetServicesStats(DateTime lower)
        {
            //Deal with requests and appointment statistic
            var requestRaw = _context.Requests
                .Include(x => x.Appointments)
                .ThenInclude(x => x.Feedbacks)
                .Where(x =>
                x.StartTime >= lower
                && (x.Appointments.Count == 0
                || x.Appointments.First().StartTime >= lower))
                .Include(x => x.Customer)
                .Select(x => new
                {
                    x.ServiceId,
                    x.RequestId,
                    appointment = x.Appointments.Count > 0 ? x.Appointments.First() : null,
                    x.Customer.Gender,
                })
                .ToHashSet();
            //Deal with revenue
            var money = _context.ServiceTransactions
                .Include(x => x.Transaction)
                .Where(x =>
                x.Transaction.Status
                && x.Transaction.CompleteTime >= lower)
                .Include(x => x.Request)
                .Select(x => new
                {
                    x.Request.RequestId,
                    x.Request.ServiceId,
                    x.Transaction.TotalPrice
                })
                .ToHashSet();
            var services = _context.SpaServices
                .Select(x => x.ServiceId);
            var map = new Dictionary<string, ServiceStatistic>();
            foreach (var service in services)
            {
                if (!map.ContainsKey(service))
                {
                    map.Add(service, new());
                }
                var requestOfThisService = requestRaw
                    .Where(x => x.ServiceId == service);
                var entry = map[service];
                foreach(var u in requestOfThisService)
                {
                    entry.RequestCount++;
                    var moneyOfRequest = money.FirstOrDefault(x => x.RequestId == u.RequestId);
                    if (u.appointment != null)
                    {
                        entry.AppointmentCount++;
                        if (u.appointment.Feedbacks.Count > 0)
                        {
                            foreach (var r in u.appointment.Feedbacks)
                            {
                                entry.Rating[r.Rating - 1]++;
                            }
                        }
                        
                    }
                    entry.Revenue += moneyOfRequest?.TotalPrice ?? 0;
                    var gender = u.Gender == "Female" ? 0 : 1;
                    entry.GenderCount[gender]++;
                }
                requestRaw.RemoveWhere(x => x.ServiceId == service);
            }
            return map;
        }
    }
}
