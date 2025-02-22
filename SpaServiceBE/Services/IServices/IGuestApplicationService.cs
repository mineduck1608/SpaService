using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IGuestApplicationService
    {
        Task<IEnumerable<GuestApplication>> GetAllAsync();
        Task<GuestApplication> GetGuestApplicationById(string id);
        Task AddAsync(GuestApplication guestApplication);
        Task<bool> UpdateAsync(GuestApplication guestApplication);
        Task DeleteAsync(string id);
    }
}
