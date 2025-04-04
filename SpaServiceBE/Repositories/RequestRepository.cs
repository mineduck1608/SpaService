﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;
using System.Collections;
using System.Diagnostics;

namespace Repositories
{
    public class RequestRepository
    {
        private readonly SpaserviceContext _context;

        public RequestRepository(SpaserviceContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetEmployeesByIds(List<string> ids)
        {
            return await _context.Employees.Where(e => ids.Contains(e.EmployeeId)).ToListAsync();
        }

        public async Task<List<Customer>> GetCustomersByIds(List<string> ids)
        {
            return await _context.Customers.Where(c => ids.Contains(c.CustomerId)).ToListAsync();
        }

        public async Task<List<SpaService>> GetServicesByIds(List<string> ids)
        {
            return await _context.SpaServices.Where(s => ids.Contains(s.ServiceId)).ToListAsync();
        }


        public async Task<(List<Request> Data, int TotalPages)> GetPaginatedRequests(int page, int limit)
        {
            var query = _context.Requests.AsQueryable();
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            var customerRequests = await query
                .OrderByDescending(r => r.CreatedAt)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return (customerRequests, totalPages);
        }

        // Lấy Request theo ID với các thực thể liên quan
        public async Task<Request> GetById(string requestId)
        {
            return await _context.Requests
                .Include(e => e.Employee)
                .Include(e => e.Service)
                .Include(e => e.Customer)
                .FirstOrDefaultAsync(r => r.RequestId == requestId);
        }

        // Lấy tất cả Requests với các thực thể liên quan
        public async Task<List<Request>> GetAll()
        {
            return await _context.Requests
   
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
            var x = await _context.Requests.Include(x => x.Customer).Include(x => x.ServiceTransactions)
                .Where(x => 
                x.Customer.AccountId == accId
                )
                .OrderByDescending(x => x.CreatedAt)
                .Take(40)
                .ToListAsync();
            return x;
        }

        public async Task<(ISet<string> roomId, ISet<string> empId, bool conflictRequest)> FindUnavailableRoomAndEmp(Request request, bool findInAppointments)
        {
            //Tìm các appointment tg request => Tìm phòng nào, nv nào ko dùng đc
            var appointments = _context.Appointments
                .ToList()
                .Select(x =>
                {
                    return new
                    {
                        x.StartTime,
                        x.EndTime,
                        x.EmployeeId,
                        x.RoomId,
                    };
                });

            //Lọc theo tg
            var start = request.StartTime;
            var service = _context.SpaServices.FirstOrDefault(x => x.ServiceId == request.ServiceId);
            var end = request.StartTime.Add(service.Duration.ToTimeSpan());
            //Tìm các appointment trong khoảng tg này => các phòng và nv trong đống này vứt hết
            var unavailableAppointment = appointments.Where(x =>
                IsOverlap(start.Ticks, end.Ticks, x.StartTime.Ticks, x.EndTime.Ticks)
            ).Select(x => (x.EmployeeId, x.RoomId)).ToList();
            (ISet<string> roomId, ISet<string> empId, bool conflict) result = new()
            {
                empId = new HashSet<string>(),
                roomId = new HashSet<string>(),
                conflict = false
            };
            foreach (var item in unavailableAppointment)
            {
                result.roomId.Add(item.RoomId);
                result.empId.Add(item.EmployeeId);
            }
            //Tìm trong request lun
            //var requests = _context.Requests
            //    .Include(x => x.Service)
            //    .ToList()
            //    .Select(x => new
            //    {
            //        x.StartTime,
            //        EndTime = x.StartTime.Add(x.Service.Duration.ToTimeSpan()),
            //        x.EmployeeId,
            //    }
            //);
            //var unavailableRequest = requests.Where(x =>
            //IsOverlap(start.Ticks, end.Ticks, x.StartTime.Ticks, x.EndTime.Ticks)
            //);

            //foreach (var item in unavailableRequest)
            //{
            //    if (item.EmployeeId != null)
            //    {
            //        result.empId.Add(item.EmployeeId);
            //    }
            //}
            //result.conflict = unavailableRequest.Any();
            if (!findInAppointments)
            {
                return result;
            }
            return result;
        }

        private bool IsOverlap(long x1, long x2, long y1, long y2)
        {
            var low = Math.Min(x1, y1);
            var high = Math.Max(x2, y2);
            return high - low < (x2 - x1) + (y2 - y1);
        }
    }
}
