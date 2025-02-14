using Repositories.Entities;
using Repositories.Repositories;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ShiftService : IShiftService
    {
        private readonly ShiftRepository _shiftRepository;

        public ShiftService(ShiftRepository shiftRepository)
        {
            _shiftRepository = shiftRepository ?? throw new ArgumentNullException(nameof(shiftRepository));
        }

        public async Task<IEnumerable<Shift>> GetAllShifts()
        {
            return await _shiftRepository.GetAll();
        }

        public async Task<Shift> GetShiftById(string id)
        {
            return await _shiftRepository.GetById(id);
        }

        public async Task<bool> AddShift(Shift shift)
        {
            return await _shiftRepository.Add(shift);
        }

        public async Task<bool> UpdateShift(Shift shift, string id)
        {
            return await _shiftRepository.Update(shift, id);
        }

        public async Task<bool> DeleteShift(string id)
        {
            return await _shiftRepository.Delete(id);
        }
    }
}
