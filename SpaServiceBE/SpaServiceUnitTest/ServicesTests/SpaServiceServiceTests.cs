using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Repositories;
using Repositories.Entities;
using Services;
using Xunit;

public class SpaServiceServiceTests
{
    private readonly Mock<SpaServiceRepository> _repositoryMock;
    private readonly SpaServiceContext _spaServiceService;

    public SpaServiceServiceTests()
    {
        _repositoryMock = new Mock<SpaServiceRepository>();
        _spaServiceService = new SpaServiceContext(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetById_ShouldReturnSpaService_WhenServiceExists()
    {
        // Arrange
        var serviceId = "S001";
        var expectedService = new SpaService
        {
            ServiceId = serviceId,
            ServiceName = "Full Body Massage",
            Price = 100.0f,
            Duration = new TimeOnly(1, 30),
            Description = "Relaxing massage",
            ServiceImage = "image.jpg",
            CategoryId = "C001",
            IsDeleted = false
        };

        _repositoryMock.Setup(repo => repo.GetById(serviceId))
            .ReturnsAsync(expectedService);

        // Act
        var result = await _spaServiceService.GetById(serviceId);

        // Assert
        result.Should().NotBeNull();
        result.ServiceId.Should().Be(serviceId);
        result.ServiceName.Should().Be("Full Body Massage");
    }

    [Fact]
    public async Task GetTimeByServiceId_ShouldReturnDuration()
    {
        // Arrange
        var serviceId = "S001";
        var service = new SpaService
        {
            ServiceId = serviceId,
            Duration = new TimeOnly(1, 30)
        };

        _repositoryMock.Setup(repo => repo.GetById(serviceId))
            .ReturnsAsync(service);

        // Act
        var result = await _spaServiceService.GetTimeByServiceId(serviceId);

        // Assert
        result.Should().Be(new TimeOnly(1, 30));
    }

    [Fact]
    public async Task GetByName_ShouldReturnSpaService_WhenServiceExists()
    {
        // Arrange
        var serviceName = "Facial Treatment";
        var expectedService = new SpaService
        {
            ServiceId = "S002",
            ServiceName = serviceName
        };

        _repositoryMock.Setup(repo => repo.GetByName(serviceName))
            .ReturnsAsync(expectedService);

        // Act
        var result = await _spaServiceService.GetByName(serviceName);

        // Assert
        result.Should().NotBeNull();
        result.ServiceName.Should().Be(serviceName);
    }

    [Fact]
    public async Task GetAll_ShouldReturnListOfSpaServices()
    {
        // Arrange
        var services = new List<SpaService>
        {
            new SpaService { ServiceId = "S001", ServiceName = "Massage" },
            new SpaService { ServiceId = "S002", ServiceName = "Facial" }
        };

        _repositoryMock.Setup(repo => repo.GetAll())
            .ReturnsAsync(services);

        // Act
        var result = await _spaServiceService.GetAll();

        // Assert
        result.Should().NotBeNullOrEmpty();
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task Add_ShouldReturnTrue_WhenSpaServiceIsAdded()
    {
        // Arrange
        var newService = new SpaService
        {
            ServiceId = "S003",
            ServiceName = "Hot Stone Therapy",
            Price = 120.0f
        };

        _repositoryMock.Setup(repo => repo.Add(newService))
            .ReturnsAsync(true);

        // Act
        var result = await _spaServiceService.Add(newService);

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task Update_ShouldReturnTrue_WhenSpaServiceIsUpdated()
    {
        // Arrange
        var serviceId = "S001";
        var updatedService = new SpaService
        {
            ServiceId = serviceId,
            ServiceName = "Updated Massage"
        };

        _repositoryMock.Setup(repo => repo.Update(serviceId, updatedService))
            .ReturnsAsync(true);

        // Act
        var result = await _spaServiceService.Update(serviceId, updatedService);

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task Delete_ShouldReturnTrue_WhenSpaServiceIsDeleted()
    {
        // Arrange
        var serviceId = "S001";

        _repositoryMock.Setup(repo => repo.Delete(serviceId))
            .ReturnsAsync(true);

        // Act
        var result = await _spaServiceService.Delete(serviceId);

        // Assert
        result.Should().BeTrue();
    }
}
