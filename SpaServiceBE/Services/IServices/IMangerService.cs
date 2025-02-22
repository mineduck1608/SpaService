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
        Task AddManager(Manager manager);
        Task<bool> UpdateManager(Manager manager);
        Task DeleteManager(string id);
    }
}
