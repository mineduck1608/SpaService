using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class AttendanceRecordRepository
    {
        private readonly SpaServiceContext _context;

        public AttendanceRecordRepository(SpaServiceContext context)
        {
            _context = context;
        }

        // Get all attendance records
        public async Task<IEnumerable<AttendanceRecord>> GetAll()
        {
            return await _context.AttendanceRecords
                .Include(ar => ar.Employee) // Include related Employee
                .ToListAsync();
        }

        // Get an attendance record by its ID
        public async Task<AttendanceRecord> GetById(string id)
        {
            return await _context.AttendanceRecords
                .Include(ar => ar.Employee) // Include related Employee
                .FirstOrDefaultAsync(ar => ar.AttendanceId == id);
        }

        // Add a new attendance record
        public async Task<bool> Add(AttendanceRecord attendanceRecord)
        {
            _context.AttendanceRecords.Add(attendanceRecord);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        // Update an existing attendance record
        public async Task<bool> Update(AttendanceRecord attendanceRecord, string id)
        {
            var existingAttendance = await _context.AttendanceRecords
                .FirstOrDefaultAsync(ar => ar.AttendanceId == id);
            if (existingAttendance == null)
                return false;

            existingAttendance.Date = attendanceRecord.Date;
            existingAttendance.CheckInTime = attendanceRecord.CheckInTime;
            existingAttendance.CheckOutTime = attendanceRecord.CheckOutTime;
            existingAttendance.EmployeeId = attendanceRecord.EmployeeId;

            _context.AttendanceRecords.Update(existingAttendance);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        // Delete an attendance record by its ID
        public async Task<bool> Delete(string id)
        {
            var attendanceRecord = await _context.AttendanceRecords
                .FirstOrDefaultAsync(ar => ar.AttendanceId == id);
            if (attendanceRecord == null)
                return false;

            _context.AttendanceRecords.Remove(attendanceRecord);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
    }
}
