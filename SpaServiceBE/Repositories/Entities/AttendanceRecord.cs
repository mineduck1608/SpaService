using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class AttendanceRecord
{
    public string AttendanceId { get; set; } = null!;

    public DateOnly Date { get; set; }

    public DateTime? CheckInTime { get; set; }

    public DateTime? CheckOutTime { get; set; }

    public string EmployeeId { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;
}
