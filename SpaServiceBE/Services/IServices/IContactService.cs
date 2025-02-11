using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IContactService
    {
        Task<Contact> GetContactById(string contactId);
        Task<Contact> GetContactByEmail(string email);
        Task<Contact> GetContactByPhone(string phoneNumber);
        Task<Contact> GetContactByFullName(string fullName);
        Task<List<Contact>> GetAllContacts();
        Task<bool> AddContact(Contact contact);
        Task<bool> DeleteContact(string contactId);
    }
}
