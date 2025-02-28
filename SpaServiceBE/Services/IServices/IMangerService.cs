using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IManagerService
    {
        Task<IEnumerable<Manager>> GetAllManagers();
        Task<Manager> GetManagerById(string id);
        Task<bool> AddManager(Manager manager);
        Task<bool> UpdateManager(Manager manager);
        Task DeleteManager(string id);
        Task<Manager> GetManagerByPhone(string phone);
        Task<Manager> GetManagerByEmail(string email);
        Task<IEnumerable<Manager>> GetAllWorkingManagers();
        Task<IEnumerable<Manager>> GetAllRetiredManagers();
    }
}
