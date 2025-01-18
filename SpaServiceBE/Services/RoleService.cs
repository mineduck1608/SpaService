using Repositories.Entities;
using Repositories.Repositories;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services
{
    public class RoleService : IRoleService
    {
        private readonly RoleRepository _roleRepository;

        public RoleService(RoleRepository roleRepository)
        {
            _roleRepository = roleRepository ?? throw new ArgumentNullException(nameof(roleRepository));
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _roleRepository.GetAll();
        }

        public async Task<Role> GetRoleById(string id)
        {
            return await _roleRepository.GetById(id);
        }

        public async Task<bool> AddRole(Role role)
        {
            return await _roleRepository.Add(role);
        }

        public async Task<bool> UpdateRole(Role role, string id)
        {
            return await _roleRepository.Update(role, id);
        }

        public async Task<bool> DeleteRole(string id)
        {
            return await _roleRepository.Delete(id);
        }
    }
}
