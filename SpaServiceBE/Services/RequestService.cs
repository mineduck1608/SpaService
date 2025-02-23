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
        public RequestService(RequestRepository requestRepository, RoomRepository roomRepository, ServiceCategoryRepository catRepository, EmployeeRepository employeeRepository)
        {
            _catRepository = catRepository;
            _requestRepository = requestRepository;
            _roomRepository = roomRepository;
            _employeesRepository = employeeRepository;
        }

        public async Task<Request> GetById(string requestId)
        {
            return await _requestRepository.GetById(requestId);
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
        public async Task<(bool roomState, int employeeState)> CheckResourceAvailable(Request q)
        {
            var (roomId, empId) = await _requestRepository.FindUnavailableRoomAndEmp(q);
            var category = await _catRepository.GetById(q.RequestId);
            var roomsOfCat = (await _roomRepository.GetRoomsOfCategory(category.CategoryId)).Select(x => x.RoomId).ToHashSet();
            var empOfCat = (await _employeesRepository.GetEmployeesByCategoryId(category.CategoryId)).Select(x => x.EmployeeId).ToHashSet();
            //Có phòng nào của cat này trống ko
            var roomState = roomsOfCat.Intersect(roomId).Any();
            //Có nv nào của cat này ok ko
            var empState = 0;
            var availableEmpSet = empId.Intersect(empId);
            if (!availableEmpSet.IsNullOrEmpty())
            {
                if (availableEmpSet.Any())
                {
                    empState = 1;
                }
            }
            else
            {
                empState = 0;
            }
            return (roomState, empState);
        }
    }
}
