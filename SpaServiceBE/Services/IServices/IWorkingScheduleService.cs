using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IWorkingScheduleService
    {
        Task<IEnumerable<WorkingSchedule>> GetAllWorkingSchedules();
        Task<WorkingSchedule> GetWorkingScheduleById(string id);
        Task<bool> AddWorkingSchedule(WorkingSchedule workingSchedule);
        Task<bool> UpdateWorkingSchedule(WorkingSchedule workingSchedule, string id);
        Task<bool> DeleteWorkingSchedule(string id);
    }
}
