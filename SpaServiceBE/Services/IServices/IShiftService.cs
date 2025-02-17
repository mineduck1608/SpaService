using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IShiftService
    {
        Task<IEnumerable<Shift>> GetAllShifts();
        Task<Shift> GetShiftById(string id);
        Task<bool> AddShift(Shift shift);
        Task<bool> UpdateShift(Shift shift, string id);
        Task<bool> DeleteShift(string id);
    }
}
