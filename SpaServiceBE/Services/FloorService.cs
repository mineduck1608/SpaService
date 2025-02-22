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
    public class FloorService :IFloorService
    {
        private readonly FloorRepository _floorRepository;

        public FloorService(FloorRepository floorRepository)
        {
            _floorRepository = floorRepository;
        }

        public async Task<IEnumerable<Floor>> GetAllFloors()
        {
            return await _floorRepository.GetAllFloors();
        }

        public async Task<Floor> GetFloorById(string id)
        {
            return await _floorRepository.GetFloorById(id);
        }

        public async Task CreateFloor(Floor floor)
        {
            await _floorRepository.CreateFloor(floor);
        }

        public async Task<bool> UpdateFloor(Floor floor)
        {
            return await _floorRepository.UpdateFloor(floor);
        }

        public async Task DeleteFloor(string id)
        {
            await _floorRepository.DeleteFloor(id);
        }
    }
}
