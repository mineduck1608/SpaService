using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories.Entities;

namespace Services
{
    public interface IRequestService
    {
        Task<Request> GetById(string requestId);
        Task<List<Request>> GetAll();
        Task<bool> Add(Request request);
        Task<bool> Update(string requestId, Request request);
        Task<bool> Delete(string requestId);
    }
}
