using Repositories;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CustomerMembershipService : ICustomerMembershipService
    {
        private readonly CustomerMembershipRepository _repository;

        public CustomerMembershipService(CustomerMembershipRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CustomerMembership>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<CustomerMembership> GetCustomerMembershipById(string customerId, string membershipId) => await _repository.GetCustomerMembershipById(customerId, membershipId);
        public async Task CreateAsync(CustomerMembership entity) => await _repository.CreateAsync(entity);
        public async Task<bool> UpdateAsync(CustomerMembership entity) => await _repository.UpdateAsync(entity);
        public async Task DeleteAsync(string customerId, string membershipId) => await _repository.DeleteAsync(customerId, membershipId);

        public async Task<CustomerMembership> FindNewestByCustomerId(string id)
        {
            return await _repository.FindNewestByCustomerId(id);
        }
        public async Task<CustomerMembership> GetCustomerMembershipByCustomerId(string customerId)
        {
            return await _repository.GetCustomerMembershipByCustomerId(customerId);
        }

        public async Task UpdateOrCreateCustomerMembershipAsync(string customerId)
        {
            try
            {
                if (string.IsNullOrEmpty(customerId))
                {
                    throw new ArgumentException("Customer ID cannot be null or empty.");
                }

                // Tính tổng tiền
                float totalPayment = await _repository.GetTotalPaymentByCustomerIdAsync(customerId);

                // Tìm Membership phù hợp
                var suitableMembership = await _repository.GetSuitableMembershipAsync(totalPayment);
                if (suitableMembership == null)
                {
                    throw new Exception("No suitable membership found.");
                }

                // Kiểm tra Membership hiện tại của khách hàng
                var currentMembership = await _repository.GetCustomerMembershipAsync(customerId);

                if (currentMembership != null)
                {
                    // Nếu khách hàng đã ở hạng đó thì không cập nhật
                    if (currentMembership.MembershipId == suitableMembership.MembershipId)
                    {
                        return;
                    }

                    // Cập nhật Membership hiện tại (set EndDate)
                    currentMembership.EndDate = DateOnly.FromDateTime(DateTime.Now);
                    await _repository.UpdateCustomerMembershipAsync(currentMembership);
                }

                // Tạo Membership mới
                var newMembership = new CustomerMembership
                {
                    CustomerId = customerId,
                    MembershipId = suitableMembership.MembershipId,
                    StartDate = DateOnly.FromDateTime(DateTime.Now),
                    EndDate = null // Membership mới không có EndDate
                };

                await _repository.CreateCustomerMembershipAsync(newMembership);
            }
            catch (Exception ex)
            {
            }
        }

    }
}
