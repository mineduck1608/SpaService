﻿using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IAppointmentService
    {
        Task<Appointment> GetAppointmentById(string appointmentId);
        Task<Appointment> GetAppointmentByRequestId(string requestId);
        Task<List<Appointment>> GetAllAppointments();
        Task<bool> AddAppointment(Appointment appointment);
        Task<bool> UpdateAppointment(string appointmentId, Appointment appointment);
        Task<bool> DeleteAppointment(string appointmentId);
        Task <List<Appointment>> GetAllAppointmentsFromEmployee(string employeeId);
        Task<List<Appointment>> GetAllAppointmentsByAccId(string accId);
        Task<int> GetTotalAppointmentInMonth(int year, int month);
        Task<(bool roomState, int employeeState, bool conflict)> CheckResourceAvailable(Appointment a);
        Task<IEnumerable<object>> GetMonthlyAppointmentCount(string employeeId, int year);
        Dictionary<DateOnly, (int male, int female)> OrderByGender();
    }

}
