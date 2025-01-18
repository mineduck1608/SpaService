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
        private readonly SpaServiceContext _context;

        public AppointmentRepository(SpaServiceContext context)
        {
            _context = context;
        }

        // Get an appointment by its ID
        public async Task<Appointment> GetById(string appointmentId)
        {
            return await _context.Appointments
                .Include(a => a.Employee)
                .Include(a => a.Request)
                .Include(a => a.Transactions)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
        }

        // Get all appointments
        public async Task<List<Appointment>> GetAll()
        {
            return await _context.Appointments
                .Include(a => a.Employee)
                .Include(a => a.Request)
                .Include(a => a.Transactions)
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
        public async Task<bool> Update(Appointment updatedAppointment, string appointmentId)
        {
            var existingAppointment = await GetById(appointmentId);
            if (existingAppointment == null) return false;

            existingAppointment.Status = updatedAppointment.Status;
            existingAppointment.EmployeeId = updatedAppointment.EmployeeId;
            existingAppointment.RequestId = updatedAppointment.RequestId;

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
    }
}
