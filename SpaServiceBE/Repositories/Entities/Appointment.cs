using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Appointment
{
    public string AppointmentId { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string RequestId { get; set; } = null!;

    public string EmployeeId { get; set; } = null!;

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? ReplacementEmployee { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Employee? ReplacementEmployeeNavigation { get; set; }

    public virtual Request Request { get; set; } = null!;
}
