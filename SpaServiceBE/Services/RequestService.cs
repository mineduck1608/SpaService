using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Repositories;
using Repositories.Entities;
using Services.IServices;

namespace Services
{
    public class RequestService : IRequestService
    {
        private readonly RequestRepository _requestRepository;
        private readonly RoomRepository _roomRepository;
        private readonly ServiceCategoryRepository _catRepository;
        private readonly EmployeeRepository _employeesRepository;
        private readonly SpaServiceRepository _spaServiceRepository;
        public RequestService(RequestRepository requestRepository, RoomRepository roomRepository, ServiceCategoryRepository catRepository, EmployeeRepository employeeRepository, SpaServiceRepository spaServiceRepository)
        {
            _catRepository = catRepository;
            _requestRepository = requestRepository;
            _roomRepository = roomRepository;
            _spaServiceRepository = spaServiceRepository;
            _employeesRepository = employeeRepository;
        }

        public async Task<Request> GetById(string requestId)
        {
            return await _requestRepository.GetById(requestId);
        }

        public async Task<(List<Request> Data, int TotalPages)> GetPaginatedRequests(int page, int limit)
        {
            return await _requestRepository.GetPaginatedRequests(page, limit);
        }

        public async Task<string> GetSpaServiceIdByRequestId(string requestId)
        {
            var request = await _requestRepository.GetById(requestId);
            return request?.ServiceId; // Dấu ? để tránh lỗi nếu request null
        }

        public async Task<List<Request>> GetAll()
        {
            return await _requestRepository.GetAll();
        }

        public async Task<bool> Add(Request request)
        {
            return await _requestRepository.Add(request);
        }

        public async Task<bool> Update(string requestId, Request request)
        {
            return await _requestRepository.Update(requestId, request);
        }

        public async Task<bool> Delete(string requestId)
        {
            return await _requestRepository.Delete(requestId);
        }

        public async Task<List<Request>> FilterByAccount(string accId)
        {
            return await _requestRepository.FilterByAccount(accId);
        }
        /// <summary>
        /// roomState: true - còn phòng, false - hết phòng 
        /// employeeState: 0 - ok, 1 - requested unavailable, 2 - ko có nv nào làm đc
        /// </summary>
        /// <param name="q"></param>
        /// <returns></returns>
        public async Task<(bool roomState, int employeeState, bool conflict)> CheckResourceAvailable(Request q)
        {
            var (roomId, empId, conflict) = await _requestRepository.FindUnavailableRoomAndEmp(q, true);
            var service = await _spaServiceRepository.GetById(q.ServiceId);
            var category = await _catRepository.GetById(service.CategoryId);
            var roomsOfCat = (await _roomRepository.GetRoomsOfCategory(category.CategoryId)).Select(x => x.RoomId).ToHashSet();
            var empOfCat = (await _employeesRepository.GetEmployeesByCategoryId(category.CategoryId)).Select(x => x.EmployeeId).ToHashSet();
            //Có phòng nào của cat này trống ko
            var roomState = roomsOfCat.Except(roomId).Any();
            //Có nv nào của cat này ok ko
            //Coi như ko có nv yêu cầu
            var empState = 1;
            var availableEmpSet = empOfCat.Except(empId);
            if (availableEmpSet != null || availableEmpSet.Any())
            {
                if (q.EmployeeId == null || availableEmpSet.Any(x => x == q.EmployeeId))
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

        public async Task<(string roomId, string employeeId)> PickRandomResource(Request q, bool chooseEmployee)
        {
            var rand = new Random();
            var (roomId, empId, conflict) = await _requestRepository.FindUnavailableRoomAndEmp(q, true);
            var service = await _spaServiceRepository.GetById(q.ServiceId);
            var category = await _catRepository.GetById(service.CategoryId);
            var roomsOfCat = (await _roomRepository.GetRoomsOfCategory(category.CategoryId)).Select(x => x.RoomId).ToHashSet();
            var empOfCat = (await _employeesRepository.GetEmployeesByCategoryId(category.CategoryId)).Select(x => x.EmployeeId).ToHashSet();
            var possibleRoom = roomsOfCat.Except(roomId).ToList();
            var chosenRoom = possibleRoom[rand.Next(possibleRoom.Count)];
            if (!chooseEmployee)
            {
                return (chosenRoom, q.EmployeeId);
            }
            var possibleEmployee = empOfCat.Except(empId).ToList();
            var chosenEmployee = possibleEmployee[rand.Next(possibleEmployee.Count)];
            return (chosenRoom, chosenEmployee);
        }
    }
}
