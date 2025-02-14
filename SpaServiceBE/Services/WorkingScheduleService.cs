using Repositories.Entities;
using Repositories.Repositories;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services
{
    public class WorkingScheduleService : IWorkingScheduleService
    {
        private readonly WorkingScheduleRepository _workingScheduleRepository;

        public WorkingScheduleService(WorkingScheduleRepository workingScheduleRepository)
        {
            _workingScheduleRepository = workingScheduleRepository ?? throw new ArgumentNullException(nameof(workingScheduleRepository));
        }

        public async Task<IEnumerable<WorkingSchedule>> GetAllWorkingSchedules()
        {
            return await _workingScheduleRepository.GetAll();
        }

        public async Task<WorkingSchedule> GetWorkingScheduleById(string id)
        {
            return await _workingScheduleRepository.GetById(id);
        }

        public async Task<bool> AddWorkingSchedule(WorkingSchedule workingSchedule)
        {
            return await _workingScheduleRepository.Add(workingSchedule);
        }

        public async Task<bool> UpdateWorkingSchedule(WorkingSchedule workingSchedule, string id)
        {
            return await _workingScheduleRepository.Update(workingSchedule, id);
        }

        public async Task<bool> DeleteWorkingSchedule(string id)
        {
            return await _workingScheduleRepository.Delete(id);
        }
    }
}
