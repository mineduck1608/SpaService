using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Employee
{
    public string EmployeeId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Position { get; set; } = null!;

    public DateTime? HireDate { get; set; }

    public string Status { get; set; } = null!;

    public string? Image { get; set; }

    public string AccountId { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<EmployeeCommission> EmployeeCommissions { get; set; } = new List<EmployeeCommission>();

    public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
