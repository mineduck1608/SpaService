using Repositories;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{

    public class CosmeticProductService : ICosmeticProductService
    {
        private readonly CosmeticProductRepository _repository;

        public CosmeticProductService(CosmeticProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CosmeticProduct>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<CosmeticProduct> GetById(string id)
        {
            return await _repository.GetById(id);
        }

        public async Task Create(CosmeticProduct item)
        {
            await _repository.Create(item);
        }

        public async Task Update(CosmeticProduct item)
        {
            await _repository.Update(item);
        }

        public async Task Delete(string id)
        {
            await _repository.Delete(id);
        }
    }
}
