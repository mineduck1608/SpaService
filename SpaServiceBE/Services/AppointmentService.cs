using Microsoft.IdentityModel.Tokens;
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
        private readonly RoomRepository _roomRepository;
        private readonly ServiceCategoryRepository _catRepository;
        private readonly EmployeeRepository _employeesRepository;
        private readonly SpaServiceRepository _spaServiceRepository;

        public AppointmentService(AppointmentRepository repository, RoomRepository roomRepository, ServiceCategoryRepository catRepository, EmployeeRepository employeeRepository, SpaServiceRepository spaServiceRepository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _catRepository = catRepository;
            _roomRepository = roomRepository;
            _spaServiceRepository = spaServiceRepository;
            _employeesRepository = employeeRepository;
        }

        // Get an appointment by its ID
        public async Task<Appointment> GetAppointmentById(string appointmentId)
        {
            return await _repository.GetById(appointmentId);
        }

        public async Task<Appointment> GetAppointmentByRequestId(string requestId)
        {
            return await _repository.GetByRequestId(requestId);
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

        public async Task<List<Appointment>> GetAllAppointmentsByAccId(string accId)
        {
            return await _repository.GetAppointmentsFromCustomer(accId);
        }
        public async Task<int> GetTotalAppointmentInMonth(int year, int month)
        {
            return await _repository.GetTotalAppointmentInMonth(year, month);
        }

        public async Task<(bool roomState, int employeeState, bool conflict)> CheckResourceAvailable(Appointment a)
        {
            var (roomId, empId, conflict) = await _repository.FindUnavailableRoomAndEmp(a, true);
            var service = await _spaServiceRepository.GetById(a.Request.ServiceId);
            var category = await _catRepository.GetById(service.CategoryId);
            var roomsOfCat = (await _roomRepository.GetRoomsOfCategory(category.CategoryId)).Select(x => x.RoomId).ToHashSet();
            var empOfCat = (await _employeesRepository.GetEmployeesByCategoryId(category.CategoryId)).Select(x => x.EmployeeId).ToHashSet();
            //Có phòng nào của cat này trống ko
            var roomState = roomsOfCat.Except(roomId).Any();
            //Có nv nào của cat này ok ko
            //Coi như ko có nv yêu cầu
            var empState = 1;
            var availableEmpSet = empOfCat.Except(empId);
            if (!availableEmpSet.IsNullOrEmpty())
            {
                if (a.EmployeeId == null || availableEmpSet.Any(x => x == a.EmployeeId))
                {
                    empState = 0;
                }
            }
            else
            {
                empState = 2;
            }
            return (roomState, empState, conflict);
        }
    }
}
