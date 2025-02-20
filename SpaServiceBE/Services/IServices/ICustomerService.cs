using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface ICustomerService
    {
        Task<Customer> GetCustomerById(string customerId);
        Task<List<Customer>> GetAllCustomers();
        Task<bool> AddCustomer(Customer customer);
        Task<bool> UpdateCustomer(string customerId, Customer customer);
        Task<bool> DeleteCustomer(string customerId);
        Task<Customer> GetCustomerByPhone(string phone);

        Task<Customer> GetCustomerByAccountId(string id);
        Task<Customer> GetCustomerByEmail(string email);
    }
}
