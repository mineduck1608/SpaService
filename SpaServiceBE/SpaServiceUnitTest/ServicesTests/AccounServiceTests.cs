using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;
using Repositories;
using Repositories.Context;
using Repositories.Entities;
using Services;
using Xunit;

namespace SpaServiceUnitTest
{
    public class AccountServiceTests
    {
        private readonly SpaserviceContext _context;
        private readonly AccountRepository _accountRepository;
        private readonly AccountService _accountService;

        public AccountServiceTests()
        {
            // Cấu hình InMemory Database
            var options = new DbContextOptionsBuilder<SpaserviceContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new SpaserviceContext(options);

            // Khởi tạo Repository và Service
            _accountRepository = new AccountRepository(_context);
            _accountService = new AccountService(_accountRepository);

            // Khởi tạo dữ liệu mẫu
            SeedData();
        }

        private void SeedData()
        {
            var accounts = new List<Account>
            {
                new Account
                {
                    AccountId = "1",
                    Username = "user1",
                    Password = "password1",
                    Status = true,
                    RoleId = "admin",
                    CreatedAt = DateTime.UtcNow,
                    Role = new Role { RoleId = "admin", RoleName = "Administrator" }
                },
                new Account
                {
                    AccountId = "2",
                    Username = "user2",
                    Password = "password2",
                    Status = false,
                    RoleId = "user",
                    CreatedAt = DateTime.UtcNow,
                    Role = new Role { RoleId = "user", RoleName = "User" }
                }
            };

            _context.Accounts.AddRange(accounts);
            _context.SaveChanges();
        }

        [Fact]
        public async Task GetAccountById_ShouldReturnAccount_WhenAccountExists()
        {
            // Act
            var result = await _accountService.GetAccountById("1");

            // Assert
            result.Should().NotBeNull();
            result.AccountId.Should().Be("1");
            result.Username.Should().Be("user1");
            result.Role.RoleName.Should().Be("Administrator");
        }

        [Fact]
        public async Task GetAllAccounts_ShouldReturnAllAccounts()
        {
            // Act
            var result = await _accountService.GetAllAccounts();

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2);
        }

        [Fact]
        public async Task AddAccount_ShouldAddNewAccount()
        {
            // Arrange
            var newAccount = new Account
            {
                AccountId = "3",
                Username = "user3",
                Password = "password3",
                Status = true,
                RoleId = "user",
                CreatedAt = DateTime.UtcNow
            };

            // Act
            await _accountService.AddAccount(newAccount);

            // Assert
            var accounts = await _accountService.GetAllAccounts();
            accounts.Should().HaveCount(3);
        }

        [Fact]
        public async Task DeleteAccount_ShouldRemoveAccount()
        {
            // Act
            await _accountService.DeleteAccount("1");

            // Assert
            var accounts = await _accountService.GetAllAccounts();
            accounts.Should().HaveCount(1);
        }

        [Fact]
        public async Task UpdateAccount_ShouldModifyExistingAccount()
        {
            // Arrange
            var updatedAccount = new Account
            {
                AccountId = "1",
                Username = "updatedUser",
                Password = "updatedPassword",
                Status = false,
                RoleId = "admin",
                UpdatedAt = DateTime.UtcNow
            };

            // Act
            var result = await _accountService.UpdateAccount(updatedAccount, "1");

            // Assert
            result.Should().BeTrue();
            var account = await _accountService.GetAccountById("1");
            account.Username.Should().Be("updatedUser");
        }
    }
}
