using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IMembershipService
    {
        Task<Membership> GetMembershipById(string membershipId);
        Task<List<Membership>> GetAllMemberships();
        Task<bool> AddMembership(Membership membership);
        Task<bool> UpdateMembership(string membershipId, Membership membership);
        Task<bool> DeleteMembership(string membershipId);
    }
}
