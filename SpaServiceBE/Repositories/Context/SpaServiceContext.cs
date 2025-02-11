using System;
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

    public virtual DbSet<Application> Applications { get; set; }

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

    public virtual DbSet<Shift> Shifts { get; set; }

    public virtual DbSet<SpaService> SpaServices { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<WorkingSchedule> WorkingSchedules { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:spaservice.database.windows.net;Database=SpaService;UID=spaservice;PWD=Passmonanhemeii@;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__Account__F267251EDC136022");

            entity.ToTable("Account");

            entity.HasIndex(e => e.RoleId, "IX_Account_roleId");

            entity.HasIndex(e => e.Username, "UQ__Account__F3DBC572F6F4CF80").IsUnique();

            entity.Property(e => e.AccountId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("accountId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.RoleId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("roleId");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
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
            entity.HasKey(e => e.ApplicationId).HasName("PK__Applicat__79FDB1CF07D56196");

            entity.ToTable("Application");

            entity.Property(e => e.ApplicationId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("applicationId");
            entity.Property(e => e.Content)
                .HasMaxLength(255)
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt).HasColumnName("createdAt");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("createdBy");
            entity.Property(e => e.IsApproved).HasColumnName("isApproved");
            entity.Property(e => e.IsPending).HasColumnName("isPending");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Applications)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKApplicatio674237");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__Appointm__D06765FEFE7307EE");

            entity.ToTable("Appointment");

            entity.HasIndex(e => e.EmployeeId, "IX_Appointment_employeeId");

            entity.HasIndex(e => e.RequestId, "IX_Appointment_requestId");

            entity.Property(e => e.AppointmentId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("appointmentId");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.EndTime)
                .HasDefaultValueSql("(NULL)")
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.ReplacementEmployee)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)")
                .HasColumnName("replacementEmployee");
            entity.Property(e => e.RequestId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("requestId");
            entity.Property(e => e.StartTime)
                .HasDefaultValueSql("(NULL)")
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.Employee).WithMany(p => p.AppointmentEmployees)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKAppointmen55642");

            entity.HasOne(d => d.ReplacementEmployeeNavigation).WithMany(p => p.AppointmentReplacementEmployeeNavigations)
                .HasForeignKey(d => d.ReplacementEmployee)
                .HasConstraintName("FK__Appointme__repla__44CA3770");

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
                        j.HasIndex(new[] { "EmployeeId" }, "IX_CategoryEmployee_employeeId");
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

            entity.HasIndex(e => e.AccountId, "IX_Customer_accountId");

            entity.HasIndex(e => e.MembershipId, "IX_Customer_membershipId");

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
                .HasMaxLength(50)
                .HasColumnName("gender");
            entity.Property(e => e.MembershipId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("membershipId");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
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

            entity.HasIndex(e => e.AccountId, "IX_Employee_accountId");

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
                .IsUnicode(false);
            entity.Property(e => e.FullName)
                .HasMaxLength(50)
                .HasColumnName("fullName");
            entity.Property(e => e.HireDate)
                .HasColumnType("datetime")
                .HasColumnName("hireDate");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .HasColumnName("image");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false);
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

            entity.HasIndex(e => e.CommissionId, "IX_EmployeeCommission_commissionId");

            entity.HasIndex(e => e.TransactionId, "IX_EmployeeCommission_transactionId");

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
            entity.Property(e => e.CommissionValue)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("commissionValue");

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

            entity.HasIndex(e => e.CreatedBy, "IX_Feedback_createdBy");

            entity.HasIndex(e => e.ServiceId, "IX_Feedback_serviceId");

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

            entity.HasIndex(e => e.CustomerId, "IX_Request_customerId");

            entity.HasIndex(e => e.ServiceId, "IX_Request_serviceId");

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

        modelBuilder.Entity<Shift>(entity =>
        {
            entity.HasKey(e => e.ShiftId).HasName("PK__Shift__F2F06B02B4E8FE24");

            entity.ToTable("Shift");

            entity.Property(e => e.ShiftId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("shiftId");
            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.ShiftName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("shiftName");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<SpaService>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__SpaServi__455070DFB8D54B16");

            entity.ToTable("SpaService");

            entity.HasIndex(e => e.CategoryId, "IX_SpaService_categoryId");

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
            entity.Property(e => e.NoOfSessions)
                .HasDefaultValue(1)
                .HasColumnName("noOfSessions");
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

            entity.HasIndex(e => e.AppointmentId, "IX_Transaction_appointmentId");

            entity.HasIndex(e => e.MembershipId, "IX_Transaction_membershipId");

            entity.HasIndex(e => e.PromotionId, "IX_Transaction_promotionId");

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

        modelBuilder.Entity<WorkingSchedule>(entity =>
        {
            entity.HasKey(e => e.WorkingScheduleId).HasName("PK__WorkingS__FA6ABE96E5425908");

            entity.ToTable("WorkingSchedule");

            entity.Property(e => e.WorkingScheduleId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("workingScheduleId");
            entity.Property(e => e.CheckInTime)
                .HasColumnType("datetime")
                .HasColumnName("checkInTime");
            entity.Property(e => e.CheckOutTime)
                .HasColumnType("datetime")
                .HasColumnName("checkOutTime");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("employeeId");
            entity.Property(e => e.ShiftId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("shiftId");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Employee).WithMany(p => p.WorkingSchedules)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKWorkingSch960436");

            entity.HasOne(d => d.Shift).WithMany(p => p.WorkingSchedules)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKWorkingSch240631");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
