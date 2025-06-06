﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories.Entities;

namespace Services.IServices
{
    public interface IRequestService
    {
        Task<Request> GetById(string requestId);
        Task<List<Request>> GetAll();
        Task<List<Request>> FilterByAccount(string accId);
        Task<bool> Add(Request request);
        Task<bool> Update(string requestId, Request request);
        Task<bool> Delete(string requestId);
        Task<(bool roomState, int employeeState, bool conflict)> CheckResourceAvailable(Request q);
        Task<(string roomId, string employeeId)> PickRandomResource(Request q, bool chooseEmployee);
        Task<string> GetSpaServiceIdByRequestId(string requestId);

        Task<(List<Request> Data, int TotalPages)> GetPaginatedRequests(int page, int limit);
        Task<List<Employee>> GetEmployeesByIds(List<string> ids);
        Task<List<Customer>> GetCustomersByIds(List<string> ids);
        Task<List<SpaService>> GetServicesByIds(List<string> ids);
    }
}
