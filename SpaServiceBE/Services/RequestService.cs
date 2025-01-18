using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Repositories.Entities;

namespace Services
{
    public class RequestService : IRequestService
    {
        private readonly RequestRepository _requestRepository;

        public RequestService(RequestRepository requestRepository)
        {
            _requestRepository = requestRepository;
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
    }
}
