using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class CustomerService : ICustomerService
    {
        private readonly CustomerRepository _repository;

        public CustomerService(CustomerRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Lấy Customer theo ID
        public async Task<Customer> GetCustomerById(string customerId)
        {
            return await _repository.GetById(customerId);
        }

        // Lấy tất cả Customers
        public async Task<List<Customer>> GetAllCustomers()
        {
            return await _repository.GetAll();
        }

        // Thêm một Customer mới
        public async Task<bool> AddCustomer(Customer customer)
        {
            return await _repository.Add(customer);
        }

        // Cập nhật Customer
        public async Task<bool> UpdateCustomer(string customerId, Customer customer)
        {
            return await _repository.Update(customerId, customer);
        }

        // Xóa Customer
        public async Task<bool> DeleteCustomer(string customerId)
        {
            return await _repository.Delete(customerId);
        }
    }
}
