using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetAllRoles();
        Task<Role> GetRoleById(string id);
        Task<bool> AddRole(Role role);
        Task<bool> UpdateRole(Role role, string id);
        Task<bool> DeleteRole(string id);
    }
}
