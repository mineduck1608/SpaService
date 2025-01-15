using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Employee
{
    public string EmployeeId { get; set; } = null!;

    public string? AccountId { get; set; }

    public string FullName { get; set; } = null!;

    public string Position { get; set; } = null!;

    public DateTime HireDate { get; set; }

    public string? Status { get; set; }

    public string? Image { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<Shift> Shifts { get; set; } = new List<Shift>();

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
