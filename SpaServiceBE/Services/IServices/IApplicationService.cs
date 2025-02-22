using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IApplicationService
    {
        Task<IEnumerable<Application>> GetAllApplicationsAsync();
        Task<Application> GetApplicationByIdAsync(string id);
        Task CreateApplicationAsync(Application application);
        Task<bool> UpdateApplicationAsync(Application application);
        Task DeleteApplicationAsync(string id);
    }
}
