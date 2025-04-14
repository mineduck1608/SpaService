using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using Repositories;
using Repositories.Entities;
using Services;
using Xunit;

public class ApplicationServiceTests
{
    private readonly Mock<ApplicationRepository> _repositoryMock;
    private readonly ApplicationService _service;

    public ApplicationServiceTests()
    {
        _repositoryMock = new Mock<ApplicationRepository>();
        _service = new ApplicationService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetAllApplicationsAsync_ReturnsApplications()
    {
        // Arrange
        var applications = new List<Application>
        {
            new Application { ApplicationId = "1", Status = "Pending", Content = "App 1" },
            new Application { ApplicationId = "2", Status = "Approved", Content = "App 2" }
        };
        _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(applications);

        // Act
        var result = await _service.GetAllApplicationsAsync();

        // Assert
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task GetApplicationByIdAsync_ReturnsApplicationWithFullDetails()
    {
        // Arrange
        var app = new Application
        {
            ApplicationId = "1",
            Status = "Pending",
            Content = "Test Content",
            AccountId = "acc123",
            CreatedAt = DateTime.UtcNow,
            ResolvedBy = "manager123",
            ResolvedAt = DateTime.UtcNow.AddDays(1),
            ManagerNote = "Approved"
        };
        _repositoryMock.Setup(r => r.GetByIdAsync("1")).ReturnsAsync(app);

        // Act
        var result = await _service.GetApplicationByIdAsync("1");

        // Assert
        Assert.NotNull(result);
        Assert.Equal("1", result.ApplicationId);
        Assert.Equal("Pending", result.Status);
        Assert.Equal("Test Content", result.Content);
        Assert.Equal("acc123", result.AccountId);
        Assert.Equal("manager123", result.ResolvedBy);
        Assert.Equal("Approved", result.ManagerNote);
    }

    [Fact]
    public async Task GetApplicationByAccountIdAsync_ReturnsApplications()
    {
        // Arrange
        var applications = new List<Application>
        {
            new Application { ApplicationId = "1", AccountId = "acc123" },
            new Application { ApplicationId = "2", AccountId = "acc123" }
        };
        _repositoryMock.Setup(r => r.GetByAccountIdAsync("acc123")).ReturnsAsync(applications);

        // Act
        var result = await _service.GetApplicationByAccountIdAsync("acc123");

        // Assert
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task CreateApplicationAsync_CallsRepository()
    {
        // Arrange
        var app = new Application { ApplicationId = "1", Status = "Pending", Content = "New App" };
        _repositoryMock.Setup(r => r.CreateAsync(app)).Returns(Task.CompletedTask);

        // Act
        await _service.CreateApplicationAsync(app);

        // Assert
        _repositoryMock.Verify(r => r.CreateAsync(app), Times.Once);
    }

    [Fact]
    public async Task UpdateApplicationAsync_ReturnsTrue_WhenUpdateSucceeds()
    {
        // Arrange
        var app = new Application { ApplicationId = "1", Status = "Approved" };
        _repositoryMock.Setup(r => r.UpdateAsync(app)).ReturnsAsync(true);

        // Act
        var result = await _service.UpdateApplicationAsync(app);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task DeleteApplicationAsync_CallsRepository()
    {
        // Arrange
        _repositoryMock.Setup(r => r.DeleteAsync("1")).Returns(Task.CompletedTask);

        // Act
        await _service.DeleteApplicationAsync("1");

        // Assert
        _repositoryMock.Verify(r => r.DeleteAsync("1"), Times.Once);
    }
}