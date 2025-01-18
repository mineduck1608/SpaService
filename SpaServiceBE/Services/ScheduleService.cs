using System.Collections.Generic;
using System.Threading.Tasks;
using Repositories;
using Repositories.Entities;

namespace Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly ScheduleRepository _scheduleRepository;

        public ScheduleService(ScheduleRepository scheduleRepository)
        {
            _scheduleRepository = scheduleRepository;
        }

        public async Task<Schedule> GetById(string scheduleId)
        {
            return await _scheduleRepository.GetById(scheduleId);
        }

        public async Task<List<Schedule>> GetAll()
        {
            return await _scheduleRepository.GetAll();
        }

        public async Task<bool> Add(Schedule schedule)
        {
            return await _scheduleRepository.Add(schedule);
        }

        public async Task<bool> Update(string scheduleId, Schedule schedule)
        {
            return await _scheduleRepository.Update(scheduleId, schedule);
        }

        public async Task<bool> Delete(string scheduleId)
        {
            return await _scheduleRepository.Delete(scheduleId);
        }
    }
}
