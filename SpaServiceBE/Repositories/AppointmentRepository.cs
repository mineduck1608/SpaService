﻿using Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Context;
using System.Diagnostics;

namespace Repositories
{
    public class AppointmentRepository
    {
        private readonly SpaserviceContext _context;

        public AppointmentRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Get an appointment by its ID
        public async Task<Appointment> GetById(string appointmentId)
        {
            return await _context.Appointments.Include(x => x.Employee).Include(y => y.Request).ThenInclude(z => z.ServiceTransactions).ThenInclude(o => o.Transaction)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
        }

        public async Task<Appointment> GetByRequestId(string requestId)
        {
            return await _context.Appointments
                .FirstOrDefaultAsync(a => a.RequestId == requestId);
        }
        public async Task<List<Appointment>> GetAppointmentsFromEmployeeId(string employeeId)
        {
            return await _context.Appointments
                .Where(e => e.EmployeeId == employeeId)
                .Include(x => x.Request)
                .ThenInclude(x => x.Service)
                .Include(x => x.Request)
                .ThenInclude(x => x.Customer)
                .Include(x => x.Room)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsFromCustomer(string accId)
        {
            var rs = _context.Appointments
                .Include(x => x.Request)
                .ThenInclude(x => x.Service)
                .Include(x => x.Room)
                .Include(x => x.Employee)
                .Where(e => e.Request.Customer.AccountId == accId)
                .OrderByDescending(x => x.StartTime)
                .ToList();
            return rs;
        }

        // Get all appointments
        public async Task<List<Appointment>> GetAll()
        {
            var appointments = await _context.Appointments.Include(x => x.Request).OrderByDescending(x => x.UpdatedAt)
                .ToListAsync();

            bool hasUpdates = false; // Biến cờ để kiểm tra có thay đổi nào cần lưu vào DB không

            foreach (var item in appointments)
            {
                if (item.EndTime < DateTime.Now && item.Status != "Finished" && item.Status != "Processing")
                {
                    item.Status = "Not Processed"; // Cập nhật trạng thái
                    hasUpdates = true; // Đánh dấu là có thay đổi
                }
            }

            // Lưu thay đổi vào cơ sở dữ liệu nếu có
            if (hasUpdates)
            {
                await _context.SaveChangesAsync();
            }

            return appointments;
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByEmployeeAndYear(string employeeId, int year)
        {
            return await _context.Appointments
                .Where(a => a.EmployeeId == employeeId && a.CheckOut.HasValue && a.CheckOut.Value.Year == year)
                .ToListAsync();
        }


        // Add a new appointment
        public async Task<bool> Add(Appointment appointment)
        {
            try
            {
                await _context.Appointments.AddAsync(appointment);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Update an existing appointment
        public async Task<bool> Update(string appointmentId, Appointment updatedAppointment)
        {
            var existingAppointment = await GetById(appointmentId);
            if (existingAppointment == null) return false;

            existingAppointment.Status = updatedAppointment.Status;
            existingAppointment.EmployeeId = updatedAppointment.EmployeeId;
            existingAppointment.StartTime = updatedAppointment.StartTime;
            existingAppointment.EndTime = updatedAppointment.EndTime;
            existingAppointment.RoomId = updatedAppointment.RoomId;
            existingAppointment.UpdatedAt = DateTime.Now;

            try
            {
                _context.Appointments.Update(existingAppointment);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Delete an appointment by its ID
        public async Task<bool> Delete(string appointmentId)
        {
            var appointment = await GetById(appointmentId);
            if (appointment == null) return false;

            try
            {
                _context.Appointments.Remove(appointment);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<int> GetTotalAppointmentInMonth(int year, int month)
        {

            return await _context.Appointments
                .Where(a => a.StartTime.Year == year && a.StartTime.Month == month)
                .CountAsync();

        }

        public async Task<(ISet<string> roomId, ISet<string> empId, bool conflictRequest)> FindUnavailableRoomAndEmp(Appointment appointment, bool findInAppointments)
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
            var start = appointment.StartTime;
            var service = _context.SpaServices.FirstOrDefault(x => x.ServiceId == appointment.Request.ServiceId);
            var end = appointment.StartTime.Add(service.Duration.ToTimeSpan());
            //Tìm các appointment trong khoảng tg này => các phòng và nv trong đống này vứt hết
            var unavailableAppointment = appointments.Where(x =>
                IsOverlap(start.Ticks, end.Ticks, x.StartTime.Ticks, x.EndTime.Ticks)
            ).Select(x => (x.EmployeeId, x.RoomId)).ToList();

            //Trong request lun

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

        public Dictionary<DateOnly, (int male, int female)> OrderByGender()
        {
            var lower = DateTime.Now.AddMonths(-3);
            lower = new(lower.Year, lower.Month, 1);
            var appointment = _context.Appointments
                .Where(x =>
                x.StartTime >= lower && x.EndTime <= DateTime.Now
                && x.CheckIn != null
                && x.CheckOut != null
                )
                .Include(x => x.Request)
                .ThenInclude(x => x.Customer);
            var rs = new Dictionary<DateOnly, (int male, int female)>();
            foreach (var item in appointment)
            {
                var key = new DateOnly(item.StartTime.Year, item.StartTime.Month, 1);
                var customer = item.Request.Customer;
                var isMale = customer.Gender == "Male";
                if (rs.ContainsKey(key))
                {
                    rs[key] = (rs[key].male + (isMale ? 1 : 0), rs[key].female + (!isMale ? 1 : 0));
                }
                else
                {
                    rs.Add(key, (isMale ? 1 : 0, !isMale ? 1 : 0));
                }
            }
            var lowerDateOnly = DateOnly.FromDateTime(lower);
            var nowDate = DateOnly.FromDateTime(DateTime.Now);
            for (; lowerDateOnly <= nowDate; lowerDateOnly = lowerDateOnly.AddMonths(1))
            {
                if (!rs.ContainsKey(lowerDateOnly))
                {
                    rs.Add(lowerDateOnly, (0, 0));
                }
            }
            return rs;
        }
    }
}
