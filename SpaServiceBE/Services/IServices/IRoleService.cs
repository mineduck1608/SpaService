using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetAllRolesAsync();
        Task<Role> GetRoleByIdAsync(string id);
        Task<bool> AddRoleAsync(Role role);
        Task<bool> UpdateRoleAsync(Role role, string id);
        Task<bool> DeleteRoleAsync(string id);
    }
}
