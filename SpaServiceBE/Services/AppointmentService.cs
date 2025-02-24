using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly AppointmentRepository _repository;

        public AppointmentService(AppointmentRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Get an appointment by its ID
        public async Task<Appointment> GetAppointmentById(string appointmentId)
        {
            return await _repository.GetById(appointmentId);
        }

        // Get all appointments
        public async Task<List<Appointment>> GetAllAppointments()
        {
            return await _repository.GetAll();
        }

        // Add a new appointment
        public async Task<bool> AddAppointment(Appointment appointment)
        {
            return await _repository.Add(appointment);
        }

        // Update an existing appointment
        public async Task<bool> UpdateAppointment(string appointmentId, Appointment updatedAppointment)
        {
            return await _repository.Update(appointmentId, updatedAppointment);
        }

        // Delete an appointment by its ID
        public async Task<bool> DeleteAppointment(string appointmentId)
        {
            return await _repository.Delete(appointmentId);
        }
        // Get all appointments from employee ID
        public async Task <List<Appointment>> GetAllAppointmentsFromEmployee(string employeeId)
        {
            return await _repository.GetAppointmentsFromEmployeeId(employeeId);
        }

        public async Task<List<Appointment>> GetAllAppointmentsByAccId(string customerId)
        {
            return await _repository.GetAppointmentsFromCustomer(customerId);
        }
    }
}
