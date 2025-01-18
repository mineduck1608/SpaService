using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class ScheduleRepository
    {
        private readonly SpaServiceContext _context;

        public ScheduleRepository(SpaServiceContext context)
        {
            _context = context;
        }

        // Lấy Schedule theo ID với thông tin Employee liên quan
        public async Task<Schedule> GetById(string scheduleId)
        {
            return await _context.Schedules
                .Include(s => s.Employee) // Bao gồm Employee liên quan đến Schedule
                .FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);
        }

        // Lấy tất cả Schedules với thông tin Employee liên quan
        public async Task<List<Schedule>> GetAll()
        {
            return await _context.Schedules
                .Include(s => s.Employee) // Bao gồm Employee liên quan đến Schedule
                .ToListAsync();
        }

        // Thêm một Schedule mới
        public async Task<bool> Add(Schedule schedule)
        {
            try
            {
                await _context.Schedules.AddAsync(schedule);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Schedule
        public async Task<bool> Update(string scheduleId, Schedule schedule)
        {
            var existingSchedule = await GetById(scheduleId);
            if (existingSchedule == null) return false;

            existingSchedule.StartTime = schedule.StartTime;
            existingSchedule.EndTime = schedule.EndTime;
            existingSchedule.CheckInTime = schedule.CheckInTime;
            existingSchedule.CheckOutTime = schedule.CheckOutTime;
            existingSchedule.Status = schedule.Status;
            existingSchedule.EmployeeId = schedule.EmployeeId;

            try
            {
                _context.Schedules.Update(existingSchedule);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Schedule
        public async Task<bool> Delete(string scheduleId)
        {
            var schedule = await GetById(scheduleId);
            if (schedule == null) return false;

            try
            {
                _context.Schedules.Remove(schedule);
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
