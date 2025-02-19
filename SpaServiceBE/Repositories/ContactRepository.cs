using Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories.Context;

namespace Repositories
{
    public class ContactRepository
    {
        private readonly SpaserviceContext _context;

        public ContactRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Get a contact by its ID
        public async Task<Contact> GetContactById(string contactId)
        {
            return await _context.Contacts.FirstOrDefaultAsync(c => c.ContactId == contactId);
        }

        // Get a contact by email
        public async Task<Contact> GetContactByEmail(string email)
        {
            return await _context.Contacts.FirstOrDefaultAsync(c => c.Email == email);
        }

        // Get a contact by phone number
        public async Task<Contact> GetContactByPhone(string phoneNumber)
        {
            return await _context.Contacts.FirstOrDefaultAsync(c => c.PhoneNumber == phoneNumber);
        }

        // Get a contact by full name
        public async Task<Contact> GetContactByFullName(string fullName)
        {
            return await _context.Contacts.FirstOrDefaultAsync(c => c.FullName == fullName);
        }

        // Get all contacts
        public async Task<List<Contact>> GetAllContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        // Add a new contact
        public async Task<bool> AddContact(Contact contact)
        {
            try
            {
                await _context.Contacts.AddAsync(contact);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Delete a contact by its ID
        public async Task<bool> DeleteContact(string contactId)
        {
            var contact = await GetContactById(contactId);
            if (contact == null) return false;

            try
            {
                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
