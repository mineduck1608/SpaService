using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories.Entities;

namespace Services
{
    public interface IScheduleService
    {
        Task<Schedule> GetById(string scheduleId);
        Task<List<Schedule>> GetAll();
        Task<bool> Add(Schedule schedule);
        Task<bool> Update(string scheduleId, Schedule schedule);
        Task<bool> Delete(string scheduleId);
    }
}
