using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IFloorService
    {
        Task<List<ServiceCategory>> GetCategoriesByIds(List<string> ids);
        Task<IEnumerable<Floor>> GetAllFloors();
        Task<Floor> GetFloorById(string id);
        Task CreateFloor(Floor floor);
        Task<bool> UpdateFloor(Floor floor);
        Task DeleteFloor(string id);
    }
}
