using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IAttendanceRecordService
    {
        // Lấy tất cả bản ghi điểm danh
        Task<IEnumerable<AttendanceRecord>> GetAllAttendanceRecords();

        // Lấy một bản ghi điểm danh theo ID
        Task<AttendanceRecord> GetAttendanceRecordById(string id);

        // Thêm mới một bản ghi điểm danh
        Task<bool> AddAttendanceRecord(AttendanceRecord attendanceRecord);

        // Cập nhật một bản ghi điểm danh
        Task<bool> UpdateAttendanceRecord(AttendanceRecord attendanceRecord, string id);

        // Xóa một bản ghi điểm danh
        Task<bool> DeleteAttendanceRecord(string id);

        Task<AttendanceRecord?> GetLatestAttendanceByEmployeeId(string employeeId);
        Task AddAttendance(AttendanceRecord attendance);
        Task UpdateAttendance(AttendanceRecord attendance);
        Task<AttendanceRecord?> GetLatestCheckInTodayAsync(string employeeId);
    }
}
