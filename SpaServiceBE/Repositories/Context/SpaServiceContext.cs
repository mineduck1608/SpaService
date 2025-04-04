﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Repositories.Entities;

namespace Repositories.Context;

public partial class SpaserviceContext : DbContext
{
    public SpaserviceContext()
    {
    }

    public SpaserviceContext(DbContextOptions<SpaserviceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AttendanceRecord> AttendanceRecords { get; set; }

    public virtual DbSet<CartCosmeticProduct> CartCosmeticProducts { get; set; }

    public virtual DbSet<CategoryEmployee> CategoryEmployees { get; set; }

    public virtual DbSet<Commission> Commissions { get; set; }

    public virtual DbSet<CosmeticCategory> CosmeticCategories { get; set; }

    public virtual DbSet<CosmeticProduct> CosmeticProducts { get; set; }

    public virtual DbSet<CosmeticTransaction> CosmeticTransactions { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<CustomerMembership> CustomerMemberships { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<EmployeeCommission> EmployeeCommissions { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Floor> Floors { get; set; }

    public virtual DbSet<GuestApplication> GuestApplications { get; set; }

    public virtual DbSet<Manager> Managers { get; set; }

    public virtual DbSet<Membership> Memberships { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<ServiceCategory> ServiceCategories { get; set; }

    public virtual DbSet<ServiceTransaction> ServiceTransactions { get; set; }

    public virtual DbSet<SpaService> SpaServices { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    private string? GetConnectionString()
    {
        IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true).Build();
        return configuration["ConnectionStrings:DefaultConnectionStringDB"];
    }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(GetConnectionString());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__Account__F267251E1B40D48A");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Username, "UQ__Account__F3DBC572805385F6").IsUnique();

            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.RoleId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("roleId");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAccount946763");
        });

        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.ApplicationId).HasName("PK__Applicat__79FDB1CFD995084A");

            entity.ToTable("Application");

            entity.Property(e => e.ApplicationId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("applicationId");
            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.Content)
                .HasMaxLength(255)
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.ManagerNote)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("managerNote");
            entity.Property(e => e.ResolvedAt)
                .HasColumnType("datetime")
                .HasColumnName("resolvedAt");
            entity.Property(e => e.ResolvedBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("resolvedBy");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Account).WithMany(p => p.ApplicationAccounts)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FKApplicatio396292");

            entity.HasOne(d => d.ResolvedByNavigation).WithMany(p => p.ApplicationResolvedByNavigations)
                .HasForeignKey(d => d.ResolvedBy)
                .HasConstraintName("FK_Application_ResolvedBy_Account");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__Appointm__D06765FE1B97A9F1");

            entity.ToTable("Appointment");

            entity.Property(e => e.AppointmentId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("appointmentId");
            entity.Property(e => e.CheckIn)
                .HasColumnType("datetime")
                .HasColumnName("checkIn");
            entity.Property(e => e.CheckOut)
                .HasColumnType("datetime")
                .HasColumnName("checkOut");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.RequestId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("requestId");
            entity.Property(e => e.RoomId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("roomId");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.Employee).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAppointmen55642");

            entity.HasOne(d => d.Request).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.RequestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAppointmen118448");

            entity.HasOne(d => d.Room).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAppointmen213905");
        });

        modelBuilder.Entity<AttendanceRecord>(entity =>
        {
            entity.HasKey(e => e.AttendanceId).HasName("PK__Attendan__0F09E0E680104399");

            entity.Property(e => e.AttendanceId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("attendanceId");
            entity.Property(e => e.CheckInTime)
                .HasColumnType("datetime")
                .HasColumnName("checkInTime");
            entity.Property(e => e.CheckOutTime)
                .HasColumnType("datetime")
                .HasColumnName("checkOutTime");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");

            entity.HasOne(d => d.Employee).WithMany(p => p.AttendanceRecords)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAttendance248059");
        });

        modelBuilder.Entity<CartCosmeticProduct>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CartCosm__3213E83F64C57DA2");

            entity.ToTable("CartCosmeticProduct");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("id");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("customerId");
            entity.Property(e => e.Included).HasColumnName("included");
            entity.Property(e => e.ProductId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("productId");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Customer).WithMany(p => p.CartCosmeticProducts)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCartCosmet861510");

            entity.HasOne(d => d.Product).WithMany(p => p.CartCosmeticProducts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCartCosmet941400");
        });

        modelBuilder.Entity<CategoryEmployee>(entity =>
        {
            entity.HasKey(e => e.CategoryEmployeeId).HasName("PK__Category__C3CC4856B7888B87");

            entity.ToTable("CategoryEmployee");

            entity.Property(e => e.CategoryEmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryEmployeeId");
            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");

            entity.HasOne(d => d.Category).WithMany(p => p.CategoryEmployees)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCategoryEm926525");

            entity.HasOne(d => d.Employee).WithMany(p => p.CategoryEmployees)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCategoryEm127434");
        });

        modelBuilder.Entity<Commission>(entity =>
        {
            entity.HasKey(e => e.CommissionId).HasName("PK__Commissi__6A570BF29F5DB05A");

            entity.ToTable("Commission");

            entity.Property(e => e.CommissionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("commissionId");
            entity.Property(e => e.Percentage).HasColumnName("percentage");
        });

        modelBuilder.Entity<CosmeticCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Cosmetic__23CAF1D82D7A0BD5");

            entity.ToTable("CosmeticCategory");

            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.CategoryDescription)
                .HasMaxLength(255)
                .HasColumnName("categoryDescription");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryName");
        });

        modelBuilder.Entity<CosmeticProduct>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Cosmetic__2D10D16ADDEAA9A8");

            entity.ToTable("CosmeticProduct");

            entity.Property(e => e.ProductId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("productId");
            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(true)
                .HasColumnName("isDeleted");
            entity.Property(e => e.IsSelling).HasColumnName("isSelling");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.ProductName)
                .HasMaxLength(50)
                .HasColumnName("productName");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Category).WithMany(p => p.CosmeticProducts)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCosmeticPr108056");
        });

        modelBuilder.Entity<CosmeticTransaction>(entity =>
        {
            entity.HasKey(e => e.CosmeticTransactionId).HasName("PK__Cosmetic__CA8F7BAC60A09AB9");

            entity.ToTable("CosmeticTransaction");

            entity.Property(e => e.CosmeticTransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cosmeticTransactionId");
            entity.Property(e => e.OrderId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("orderId");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("transactionId");

            entity.HasOne(d => d.Order).WithMany(p => p.CosmeticTransactions)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCosmeticTr963293");

            entity.HasOne(d => d.Transaction).WithMany(p => p.CosmeticTransactions)
                .HasForeignKey(d => d.TransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCosmeticTr609340");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__B611CB7DE4723379");

            entity.ToTable("Customer");

            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("customerId");
            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.DateOfBirth)
                .HasColumnType("datetime")
                .HasColumnName("dateOfBirth");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("fullName");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");

            entity.HasOne(d => d.Account).WithMany(p => p.Customers)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCustomer62882");
        });

        modelBuilder.Entity<CustomerMembership>(entity =>
        {
            entity.HasKey(e => new { e.CustomerId, e.MembershipId }).HasName("PK__Customer__2D841CBF837331FE");

            entity.ToTable("CustomerMembership");

            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MembershipId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EndDate).HasColumnName("endDate");
            entity.Property(e => e.StartDate).HasColumnName("startDate");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerMemberships)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCustomerMe513790");

            entity.HasOne(d => d.Membership).WithMany(p => p.CustomerMemberships)
                .HasForeignKey(d => d.MembershipId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCustomerMe495857");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__C134C9C1CBE2CB16");

            entity.ToTable("Employee");

            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(50)
                .HasColumnName("fullName");
            entity.Property(e => e.HireDate).HasColumnName("hireDate");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Position)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("position");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Account).WithMany(p => p.Employees)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKEmployee613705");
        });

        modelBuilder.Entity<EmployeeCommission>(entity =>
        {
            entity.HasKey(e => new { e.EmployeeId, e.CommissionId }).HasName("PK__Employee__F791B97E3E120C25");

            entity.ToTable("EmployeeCommission");

            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.CommissionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("commissionId");
            entity.Property(e => e.CommissionValue).HasColumnName("commissionValue");
            entity.Property(e => e.ServiceTransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceTransactionId");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("transactionId");

            entity.HasOne(d => d.Commission).WithMany(p => p.EmployeeCommissions)
                .HasForeignKey(d => d.CommissionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKEmployeeCo818088");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeCommissions)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKEmployeeCo384416");

            entity.HasOne(d => d.ServiceTransaction).WithMany(p => p.EmployeeCommissions)
                .HasForeignKey(d => d.ServiceTransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKEmployeeCo153613");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__2613FD2427EE55BC");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("feedbackId");
            entity.Property(e => e.AppointmentId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("appointmentId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdBy");
            entity.Property(e => e.FeedbackMessage)
                .HasMaxLength(100)
                .HasColumnName("feedbackMessage");
            entity.Property(e => e.Rating).HasColumnName("rating");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.AppointmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFeedback524908");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFeedback851355");
        });

        modelBuilder.Entity<Floor>(entity =>
        {
            entity.HasKey(e => e.FloorId).HasName("PK__Floor__867E915CA0D723C1");

            entity.ToTable("Floor");

            entity.Property(e => e.FloorId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("floorId");
            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.FloorNum).HasColumnName("floorNum");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

            entity.HasOne(d => d.Category).WithMany(p => p.Floors)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFloor761332");
        });

        modelBuilder.Entity<GuestApplication>(entity =>
        {
            entity.HasKey(e => e.GuestApplicationId).HasName("PK__GuestApp__C9EF5313D81A4AA3");

            entity.ToTable("GuestApplication");

            entity.Property(e => e.GuestApplicationId)
                .HasMaxLength(50)
                .HasColumnName("guestApplicationId");
            entity.Property(e => e.ApplicationId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("applicationId");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("fullName");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phoneNumber");

            entity.HasOne(d => d.Application).WithMany(p => p.GuestApplications)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKGuestAppli558895");
        });

        modelBuilder.Entity<Manager>(entity =>
        {
            entity.HasKey(e => e.ManagerId).HasName("PK__Manager__47E0141F6E83A1B2");

            entity.ToTable("Manager");

            entity.Property(e => e.ManagerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("managerId");
            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(50)
                .HasColumnName("fullName");
            entity.Property(e => e.HireDate).HasColumnName("hireDate");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Position)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("position");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Account).WithMany(p => p.Managers)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKManager812592");
        });

        modelBuilder.Entity<Membership>(entity =>
        {
            entity.HasKey(e => e.MembershipId).HasName("PK__Membersh__86AA3B179E73B225");

            entity.ToTable("Membership");

            entity.Property(e => e.MembershipId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("membershipId");
            entity.Property(e => e.Discount).HasColumnName("discount");
            entity.Property(e => e.TotalPayment).HasColumnName("totalPayment");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("type");
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.NewsId).HasName("PK__News__5218041E0A873456");

            entity.Property(e => e.NewsId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("newsId");
            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.Content)
                .IsUnicode(false)
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Header)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("header");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("type");

            entity.HasOne(d => d.Category).WithMany(p => p.News)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKNews310959");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Order__0809335DF306D4AF");

            entity.ToTable("Order");

            entity.Property(e => e.OrderId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("orderId");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("customerId");
            entity.Property(e => e.OrderDate)
                .HasColumnType("datetime")
                .HasColumnName("orderDate");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.RecepientName)
                .HasMaxLength(50)
                .HasColumnName("recepientName");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.TotalAmount).HasColumnName("totalAmount");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKOrder872949");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__E4FEDE4AEE9E46E7");

            entity.ToTable("OrderDetail");

            entity.Property(e => e.OrderDetailId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("orderDetailId");
            entity.Property(e => e.OrderId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("orderId");
            entity.Property(e => e.ProductId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("productId");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.SubTotalAmount).HasColumnName("subTotalAmount");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKOrderDetai440612");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKOrderDetai262451");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.PromotionId).HasName("PK__Promotio__99EB696E0B0C8AA5");

            entity.ToTable("Promotion");

            entity.HasIndex(e => e.PromotionCode, "UQ__Promotio__E9685770AEB9D58A").IsUnique();

            entity.Property(e => e.PromotionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("promotionId");
            entity.Property(e => e.DiscountValue).HasColumnName("discountValue");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.PromotionCode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("promotionCode");
            entity.Property(e => e.PromotionName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("promotionName");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__Request__E3C5DE3119D0A6DC");

            entity.ToTable("Request");

            entity.Property(e => e.RequestId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("requestId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("customerId");
            entity.Property(e => e.CustomerNote)
                .HasMaxLength(255)
                .HasColumnName("customerNote");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.ManagerNote)
                .HasMaxLength(255)
                .HasColumnName("managerNote");
            entity.Property(e => e.ServiceId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceId");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Customer).WithMany(p => p.Requests)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKRequest796587");

            entity.HasOne(d => d.Employee).WithMany(p => p.Requests)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FKRequest559498");

            entity.HasOne(d => d.Service).WithMany(p => p.Requests)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKRequest464370");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__CD98462AA7B2B8C2");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("roleId");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Room__6C3BF5BE10A31695");

            entity.ToTable("Room");

            entity.Property(e => e.RoomId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("roomId");
            entity.Property(e => e.FloorId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("floorId");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.RoomNum).HasColumnName("roomNum");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Floor).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.FloorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKRoom528640");
        });

        modelBuilder.Entity<ServiceCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__ServiceC__23CAF1D8D36B1028");

            entity.ToTable("ServiceCategory");

            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.CategoryDescription)
                .HasMaxLength(255)
                .HasColumnName("categoryDescription");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryName");
        });

        modelBuilder.Entity<ServiceTransaction>(entity =>
        {
            entity.HasKey(e => e.ServiceTransactionId).HasName("PK__ServiceT__BD73A2A4F16E2059");

            entity.ToTable("ServiceTransaction");

            entity.Property(e => e.ServiceTransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceTransactionId");
            entity.Property(e => e.MembershipId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("membershipId");
            entity.Property(e => e.RequestId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("requestId");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("transactionId");

            entity.HasOne(d => d.Membership).WithMany(p => p.ServiceTransactions)
                .HasForeignKey(d => d.MembershipId)
                .HasConstraintName("FKServiceTra189582");

            entity.HasOne(d => d.Request).WithMany(p => p.ServiceTransactions)
                .HasForeignKey(d => d.RequestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKServiceTra470968");

            entity.HasOne(d => d.Transaction).WithMany(p => p.ServiceTransactions)
                .HasForeignKey(d => d.TransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKServiceTra855570");
        });

        modelBuilder.Entity<SpaService>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__SpaServi__455070DFDF05D8E4");

            entity.ToTable("SpaService");

            entity.Property(e => e.ServiceId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceId");
            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.ServiceImage).HasColumnName("serviceImage");
            entity.Property(e => e.ServiceName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceName");

            entity.HasOne(d => d.Category).WithMany(p => p.SpaServices)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKSpaService205795");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__9B57CF72A66984E2");

            entity.ToTable("Transaction");

            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("transactionId");
            entity.Property(e => e.CompleteTime)
                .HasColumnType("datetime")
                .HasColumnName("completeTime");
            entity.Property(e => e.PaymentType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("paymentType");
            entity.Property(e => e.PromotionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("promotionId");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.TotalPrice).HasColumnName("totalPrice");
            entity.Property(e => e.TransactionType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("transactionType");

            entity.HasOne(d => d.Promotion).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.PromotionId)
                .HasConstraintName("FKTransactio965842");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
