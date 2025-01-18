using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IAppointmentService
    {
        Task<Appointment> GetAppointmentById(string appointmentId);
        Task<List<Appointment>> GetAllAppointments();
        Task<bool> AddAppointment(Appointment appointment);
        Task<bool> UpdateAppointment(Appointment appointment, string appointmentId);
        Task<bool> DeleteAppointment(string appointmentId);
    }
}
