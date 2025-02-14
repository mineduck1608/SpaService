using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class WorkingScheduleRepository
    {
        private readonly SpaServiceContext _context;

        public WorkingScheduleRepository(SpaServiceContext context)
        {
            _context = context;
        }

        // Get all working schedules
        public async Task<IEnumerable<WorkingSchedule>> GetAll()
        {
            return await _context.WorkingSchedules
                .Include(ws => ws.Employee)  // Include related Employee
                .Include(ws => ws.Shift)     // Include related Shift
                .ToListAsync();
        }

        // Get a working schedule by its ID
        public async Task<WorkingSchedule> GetById(string id)
        {
            return await _context.WorkingSchedules
                .Include(ws => ws.Employee)  // Include related Employee
                .Include(ws => ws.Shift)     // Include related Shift
                .FirstOrDefaultAsync(ws => ws.WorkingScheduleId == id);
        }

        // Add a new working schedule
        public async Task<bool> Add(WorkingSchedule workingSchedule)
        {
            _context.WorkingSchedules.Add(workingSchedule);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        // Update an existing working schedule
        public async Task<bool> Update(WorkingSchedule workingSchedule, string id)
        {
            var existingWorkingSchedule = await _context.WorkingSchedules
                .FirstOrDefaultAsync(ws => ws.WorkingScheduleId == id);
            if (existingWorkingSchedule == null)
                return false;

            existingWorkingSchedule.Date = workingSchedule.Date;
            existingWorkingSchedule.CheckInTime = workingSchedule.CheckInTime;
            existingWorkingSchedule.CheckOutTime = workingSchedule.CheckOutTime;
            existingWorkingSchedule.Status = workingSchedule.Status;
            existingWorkingSchedule.EmployeeId = workingSchedule.EmployeeId;
            existingWorkingSchedule.ShiftId = workingSchedule.ShiftId;

            _context.WorkingSchedules.Update(existingWorkingSchedule);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        // Delete a working schedule by its ID
        public async Task<bool> Delete(string id)
        {
            var workingSchedule = await _context.WorkingSchedules
                .FirstOrDefaultAsync(ws => ws.WorkingScheduleId == id);
            if (workingSchedule == null)
                return false;

            _context.WorkingSchedules.Remove(workingSchedule);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
    }
}
