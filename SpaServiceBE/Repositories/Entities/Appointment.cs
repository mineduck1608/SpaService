using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Appointment
{
    public string AppointmentId { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public string? CustomerId { get; set; }

    public string Status { get; set; } = null!;

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
