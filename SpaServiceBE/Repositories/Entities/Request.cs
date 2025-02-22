using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Request
{
    public string RequestId { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public string Status { get; set; } = null!;

    public string CustomerNote { get; set; } = null!;

    public string? ManagerNote { get; set; }

    public string ServiceId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;

    public string? EmployeeId { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual Customer Customer { get; set; } = null!;

    public virtual Employee? Employee { get; set; }

    public virtual SpaService Service { get; set; } = null!;

    public virtual ICollection<ServiceTransaction> ServiceTransactions { get; set; } = new List<ServiceTransaction>();
}
