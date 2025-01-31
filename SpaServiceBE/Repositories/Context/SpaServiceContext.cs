﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;

namespace Repositories.Context;

public partial class SpaServiceContext : DbContext
{
    public SpaServiceContext()
    {
    }

    public SpaServiceContext(DbContextOptions<SpaServiceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Commission> Commissions { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<EmployeeCommission> EmployeeCommissions { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Membership> Memberships { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<SpaService> SpaServices { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=spaservice.database.windows.net;Database=SpaService;UID=spaservice;PWD=Passmonanhemeii@;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__Account__F267251EDC136022");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Username, "UQ__Account__F3DBC572F6F4CF80").IsUnique();

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
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAccount946763");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__Appointm__D06765FEFE7307EE");

            entity.ToTable("Appointment");

            entity.Property(e => e.AppointmentId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("appointmentId");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.RequestId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("requestId");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Employee).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAppointmen55642");

            entity.HasOne(d => d.Request).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.RequestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAppointmen118448");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__23CAF1D8A4D253FF");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.CategoryDescription)
                .HasMaxLength(255)
                .HasColumnName("categoryDescription");
            entity.Property(e => e.CategoryImage).HasColumnName("categoryImage");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryName");

            entity.HasMany(d => d.Employees).WithMany(p => p.Categories)
                .UsingEntity<Dictionary<string, object>>(
                    "CategoryEmployee",
                    r => r.HasOne<Employee>().WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FKCategoryEm127434"),
                    l => l.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FKCategoryEm89344"),
                    j =>
                    {
                        j.HasKey("CategoryId", "EmployeeId").HasName("PK__Category__2FD9BD442CF73D8A");
                        j.ToTable("CategoryEmployee");
                        j.IndexerProperty<string>("CategoryId")
                            .HasMaxLength(50)
                            .IsUnicode(false)
                            .HasColumnName("categoryId");
                        j.IndexerProperty<string>("EmployeeId")
                            .HasMaxLength(50)
                            .IsUnicode(false)
                            .HasColumnName("employeeId");
                    });
        });

        modelBuilder.Entity<Commission>(entity =>
        {
            entity.HasKey(e => e.CommissionId).HasName("PK__Commissi__6A570BF27C360413");

            entity.ToTable("Commission");

            entity.Property(e => e.CommissionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("commissionId");
            entity.Property(e => e.Percentage).HasColumnName("percentage");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__B611CB7DD123CF42");

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
            entity.Property(e => e.MembershipId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("membershipId");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");

            entity.HasOne(d => d.Account).WithMany(p => p.Customers)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKCustomer62882");

            entity.HasOne(d => d.Membership).WithMany(p => p.Customers)
                .HasForeignKey(d => d.MembershipId)
                .HasConstraintName("FKCustomer595641");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__C134C9C148E32653");

            entity.ToTable("Employee");

            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.FullName)
                .HasMaxLength(50)
                .HasColumnName("fullName");
            entity.Property(e => e.HireDate).HasColumnName("hireDate");
            entity.Property(e => e.Image).HasColumnName("image");
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
            entity.HasKey(e => new { e.EmployeeId, e.CommissionId, e.TransactionId }).HasName("PK__Employee__840AEEB11E590AF8");

            entity.ToTable("EmployeeCommission");

            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.CommissionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("commissionId");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("transactionId");
            entity.Property(e => e.CommissionValue).HasColumnName("commissionValue");

            entity.HasOne(d => d.Commission).WithMany(p => p.EmployeeCommissions)
                .HasForeignKey(d => d.CommissionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKEmployeeCo818088");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeCommissions)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKEmployeeCo384416");

            entity.HasOne(d => d.Transaction).WithMany(p => p.EmployeeCommissions)
                .HasForeignKey(d => d.TransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKEmployeeCo831824");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__2613FD2480E83971");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("feedbackId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdBy");
            entity.Property(e => e.FeedbackMessage)
                .HasMaxLength(255)
                .HasColumnName("feedbackMessage");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ServiceId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFeedback851355");

            entity.HasOne(d => d.Service).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKFeedback300803");
        });

        modelBuilder.Entity<Membership>(entity =>
        {
            entity.HasKey(e => e.MembershipId).HasName("PK__Membersh__86AA3B17022CD897");

            entity.ToTable("Membership");

            entity.Property(e => e.MembershipId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("membershipId");
            entity.Property(e => e.Discount).HasColumnName("discount");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.PromotionId).HasName("PK__Promotio__99EB696E44B49C9D");

            entity.ToTable("Promotion");

            entity.HasIndex(e => e.PromotionCode, "UQ__Promotio__E9685770FFA5DACE").IsUnique();

            entity.Property(e => e.PromotionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("promotionId");
            entity.Property(e => e.DiscountValue).HasColumnName("discountValue");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
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
            entity.HasKey(e => e.RequestId).HasName("PK__Request__E3C5DE31F2E1788E");

            entity.ToTable("Request");

            entity.Property(e => e.RequestId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("requestId");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("customerId");
            entity.Property(e => e.CustomerNote)
                .HasMaxLength(255)
                .HasColumnName("customerNote");
            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("endTime");
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

            entity.HasOne(d => d.Service).WithMany(p => p.Requests)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKRequest464370");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__CD98462A7CAD45DD");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("roleId");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<Schedule>(entity =>
        {
            entity.HasKey(e => e.ScheduleId).HasName("PK__Schedule__A532EDD49C495185");

            entity.ToTable("Schedule");

            entity.Property(e => e.ScheduleId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("scheduleId");
            entity.Property(e => e.CheckInTime)
                .HasComment("null if hasn't checked in")
                .HasColumnType("datetime")
                .HasColumnName("checkInTime");
            entity.Property(e => e.CheckOutTime)
                .HasComment("null if hasn't checked out")
                .HasColumnType("datetime")
                .HasColumnName("checkOutTime");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Employee).WithMany(p => p.Schedules)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKSchedule904727");
        });

        modelBuilder.Entity<SpaService>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__SpaServi__455070DFB8D54B16");

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
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.ServiceImage).HasColumnName("serviceImage");
            entity.Property(e => e.ServiceName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceName");

            entity.HasOne(d => d.Category).WithMany(p => p.SpaServices)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKSpaService221665");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__9B57CF725A7D221F");

            entity.ToTable("Transaction");

            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("transactionId");
            entity.Property(e => e.AppointmentId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("appointmentId");
            entity.Property(e => e.MembershipId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("membershipId");
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

            entity.HasOne(d => d.Appointment).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("FKTransactio520442");

            entity.HasOne(d => d.Membership).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.MembershipId)
                .HasConstraintName("FKTransactio702984");

            entity.HasOne(d => d.Promotion).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.PromotionId)
                .HasConstraintName("FKTransactio965842");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
