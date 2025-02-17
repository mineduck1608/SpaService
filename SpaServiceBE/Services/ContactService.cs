using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class ContactService : IContactService
    {
        private readonly ContactRepository _repository;

        public ContactService(ContactRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<Contact> GetContactById(string contactId)
        {
            return await _repository.GetContactById(contactId);
        }

        public async Task<Contact> GetContactByEmail(string email)
        {
            return await _repository.GetContactByEmail(email);
        }

        public async Task<Contact> GetContactByPhone(string phoneNumber)
        {
            return await _repository.GetContactByPhone(phoneNumber);
        }

        public async Task<Contact> GetContactByFullName(string fullName)
        {
            return await _repository.GetContactByFullName(fullName);
        }

        public async Task<List<Contact>> GetAllContacts()
        {
            return await _repository.GetAllContacts();
        }

        public async Task<bool> AddContact(Contact contact)
        {
            return await _repository.AddContact(contact);
        }

        public async Task<bool> DeleteContact(string contactId)
        {
            return await _repository.DeleteContact(contactId);
        }
    }
}
