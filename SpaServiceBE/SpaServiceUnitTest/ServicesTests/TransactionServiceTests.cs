using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Repositories;
using Repositories.Entities;
using Services;
using Xunit;

public class TransactionServiceTests
{
    private readonly Mock<TransactionRepository> _repositoryMock;
    private readonly TransactionService _service;

    public TransactionServiceTests()
    {
        _repositoryMock = new Mock<TransactionRepository>();
        _service = new TransactionService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetById_ShouldReturnTransaction_WhenTransactionExists()
    {
        // Arrange
        var transactionId = "123";
        var transaction = new Transaction
        {
            TransactionId = transactionId,
            TransactionType = "Service",
            TotalPrice = 100.0f,
            Status = true,
            PaymentType = "Credit Card"
        };

        _repositoryMock.Setup(repo => repo.GetById(transactionId)).ReturnsAsync(transaction);

        // Act
        var result = await _service.GetById(transactionId);

        // Assert
        result.Should().NotBeNull();
        result.TransactionId.Should().Be(transactionId);
    }

    [Fact]
    public async Task GetAll_ShouldReturnListOfTransactions()
    {
        // Arrange
        var transactions = new List<Transaction>
        {
            new Transaction { TransactionId = "1", TransactionType = "Service", TotalPrice = 50.0f, Status = true, PaymentType = "Cash" },
            new Transaction { TransactionId = "2", TransactionType = "Product", TotalPrice = 75.0f, Status = false, PaymentType = "PayPal" }
        };

        _repositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(transactions);

        // Act
        var result = await _service.GetAll();

        // Assert
        result.Should().NotBeNullOrEmpty();
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task Add_ShouldReturnTrue_WhenTransactionIsAdded()
    {
        // Arrange
        var newTransaction = new Transaction { TransactionId = "3", TransactionType = "Product", TotalPrice = 120.0f, Status = true, PaymentType = "Bank Transfer" };

        _repositoryMock.Setup(repo => repo.Add(newTransaction)).ReturnsAsync(true);

        // Act
        var result = await _service.Add(newTransaction);

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task Update_ShouldReturnTrue_WhenTransactionIsUpdated()
    {
        // Arrange
        var transactionId = "1";
        var updatedTransaction = new Transaction { TransactionId = transactionId, TransactionType = "Service", TotalPrice = 80.0f, Status = false, PaymentType = "Credit Card" };

        _repositoryMock.Setup(repo => repo.Update(transactionId, updatedTransaction)).ReturnsAsync(true);

        // Act
        var result = await _service.Update(transactionId, updatedTransaction);

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task Delete_ShouldReturnTrue_WhenTransactionIsDeleted()
    {
        // Arrange
        var transactionId = "1";

        _repositoryMock.Setup(repo => repo.Delete(transactionId)).ReturnsAsync(true);

        // Act
        var result = await _service.Delete(transactionId);

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task GetTotalRevenue_ShouldReturnTotalRevenue()
    {
        // Arrange
        var totalRevenue = 5000.0f;

        _repositoryMock.Setup(repo => repo.GetTotalRevenue()).ReturnsAsync(totalRevenue);

        // Act
        var result = await _service.GetTotalRevenue();

        // Assert
        result.Should().Be(totalRevenue);
    }
}
