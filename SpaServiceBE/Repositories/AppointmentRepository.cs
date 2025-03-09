using Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Context;

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
            return await _context.Appointments.Include(x => x.Employee)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
        }

        public async Task<Appointment> GetByRequestId(string requestId)
        {
            return await _context.Appointments
                .FirstOrDefaultAsync(a => a.RequestId == requestId);
        }
        public async Task <List<Appointment>> GetAppointmentsFromEmployeeId(string employeeId)
        {
            return await _context.Appointments
                .Where(e => e.EmployeeId == employeeId)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsFromCustomer(string accId)
        {
            var rs = _context.Appointments
                .Include(x => x.Request)
                .ThenInclude(x => x.Service)
                .Include(x => x.Room)
                .Include(x => x.Employee)
                .Where(e => e.Request.Customer.AccountId == accId).ToList();
            return rs;
        }

        // Get all appointments
        public async Task<List<Appointment>> GetAll()
        {
            return await _context.Appointments.Include(x => x.Employee).Include(x => x.Room).Include(x => x.Request).ThenInclude(x => x.Customer).Include(x => x.Request).ThenInclude(x => x.Service)
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
            existingAppointment.UpdatedAt = updatedAppointment.UpdatedAt;

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
    }
}
