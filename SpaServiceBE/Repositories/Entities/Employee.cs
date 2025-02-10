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

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual ICollection<Appointment> AppointmentEmployees { get; set; } = new List<Appointment>();

    public virtual ICollection<Appointment> AppointmentReplacementEmployeeNavigations { get; set; } = new List<Appointment>();

    public virtual ICollection<EmployeeCommission> EmployeeCommissions { get; set; } = new List<EmployeeCommission>();

    public virtual ICollection<WorkingSchedule> WorkingSchedules { get; set; } = new List<WorkingSchedule>();

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
