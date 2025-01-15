using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Repositories.Entities;

namespace Repositories;

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

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Shift> Shifts { get; set; }

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
            entity.HasKey(e => e.AccountId).HasName("PK__Account__F267251E1848C23E");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Username, "UQ__Account__F3DBC57279950F29").IsUnique();

            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("createAt");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.RoleId)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("roleId");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Account__roleId__5FB337D6");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__Appointm__D06765FE59F24055");

            entity.ToTable("Appointment");

            entity.Property(e => e.AppointmentId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("appointmentId");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("customerId");
            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Customer).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Appointme__custo__7A672E12");

            entity.HasMany(d => d.Employees).WithMany(p => p.Appointments)
                .UsingEntity<Dictionary<string, object>>(
                    "EmployeeAppointment",
                    r => r.HasOne<Employee>().WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__EmployeeA__emplo__02084FDA"),
                    l => l.HasOne<Appointment>().WithMany()
                        .HasForeignKey("AppointmentId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__EmployeeA__appoi__01142BA1"),
                    j =>
                    {
                        j.HasKey("AppointmentId", "EmployeeId").HasName("PK__Employee__DC742962C5DC594B");
                        j.ToTable("EmployeeAppointment");
                        j.IndexerProperty<string>("AppointmentId")
                            .HasMaxLength(50)
                            .IsUnicode(false)
                            .HasColumnName("appointmentId");
                        j.IndexerProperty<string>("EmployeeId")
                            .HasMaxLength(50)
                            .IsUnicode(false)
                            .HasColumnName("employeeId");
                    });
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__23CAF1D865910711");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryId");
            entity.Property(e => e.CategoryDescription)
                .HasMaxLength(255)
                .HasColumnName("categoryDescription");
            entity.Property(e => e.CategoryImage)
                .HasMaxLength(255)
                .HasColumnName("categoryImage");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .HasColumnName("categoryName");

            entity.HasMany(d => d.Employees).WithMany(p => p.Categories)
                .UsingEntity<Dictionary<string, object>>(
                    "CategoryEmployee",
                    r => r.HasOne<Employee>().WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CategoryE__emplo__70DDC3D8"),
                    l => l.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CategoryE__categ__6FE99F9F"),
                    j =>
                    {
                        j.HasKey("CategoryId", "EmployeeId").HasName("PK__Category__2FD9BD4474B8E769");
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

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__B611CB7D596F6124");

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
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("fullName");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .HasColumnName("gender");
            entity.Property(e => e.MembershipLevel)
                .HasMaxLength(50)
                .HasColumnName("membershipLevel");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phone");

            entity.HasOne(d => d.Account).WithMany(p => p.Customers)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Customer__accoun__628FA481");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__C134C9C1E4CD42FF");

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
                .HasMaxLength(100)
                .HasColumnName("fullName");
            entity.Property(e => e.HireDate)
                .HasColumnType("datetime")
                .HasColumnName("hireDate");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .HasColumnName("image");
            entity.Property(e => e.Position)
                .HasMaxLength(50)
                .HasColumnName("position");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");

            entity.HasOne(d => d.Account).WithMany(p => p.Employees)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Employee__accoun__656C112C");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__2613FD2420559BA0");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("feedbackId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("customerId");
            entity.Property(e => e.FeedbackMessage)
                .HasMaxLength(255)
                .HasColumnName("feedbackMessage");
            entity.Property(e => e.Rate).HasColumnName("rate");
            entity.Property(e => e.ServiceId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("serviceId");

            entity.HasOne(d => d.Customer).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Feedback__custom__74AE54BC");

            entity.HasOne(d => d.Service).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.ServiceId)
                .HasConstraintName("FK__Feedback__servic__73BA3083");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.PromotionId).HasName("PK__Promotio__99EB696ECCB36E17");

            entity.ToTable("Promotion");

            entity.HasIndex(e => e.PromotionCode, "UQ__Promotio__E9685770E8AFAE7F").IsUnique();

            entity.Property(e => e.PromotionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("promotionId");
            entity.Property(e => e.DiscountValue).HasColumnName("discountValue");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.PromotionCode)
                .HasMaxLength(50)
                .HasColumnName("promotionCode");
            entity.Property(e => e.PromotionName)
                .HasMaxLength(50)
                .HasColumnName("promotionName");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__CD98462AABA09EC8");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("roleId");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<Shift>(entity =>
        {
            entity.HasKey(e => e.ShiftId).HasName("PK__Shift__F2F06B027B0778DB");

            entity.ToTable("Shift");

            entity.Property(e => e.ShiftId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("shiftId");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.EndTime).HasColumnName("endTime");
            entity.Property(e => e.ShiftName)
                .HasMaxLength(50)
                .HasColumnName("shiftName");
            entity.Property(e => e.StartTime).HasColumnName("startTime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Employee).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__Shift__employeeI__778AC167");
        });

        modelBuilder.Entity<SpaService>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__SpaServi__455070DFC95C0248");

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
            entity.Property(e => e.ServiceImage)
                .HasMaxLength(255)
                .HasColumnName("serviceImage");
            entity.Property(e => e.ServiceName)
                .HasMaxLength(50)
                .HasColumnName("serviceName");

            entity.HasOne(d => d.Category).WithMany(p => p.SpaServices)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__SpaServic__categ__6D0D32F4");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__9B57CF72E8899AA6");

            entity.ToTable("Transaction");

            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("transactionId");
            entity.Property(e => e.AppointmentId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("appointmentId");
            entity.Property(e => e.PromotionId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("promotionId");
            entity.Property(e => e.TotalPrice).HasColumnName("totalPrice");
            entity.Property(e => e.TransactionStatus).HasColumnName("transactionStatus");
            entity.Property(e => e.TransactionType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("transactionType");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("FK__Transacti__appoi__7D439ABD");

            entity.HasOne(d => d.Promotion).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.PromotionId)
                .HasConstraintName("FK__Transacti__promo__7E37BEF6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
