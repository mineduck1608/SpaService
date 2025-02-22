using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class AttendanceRecord
{
    public string AttendanceId { get; set; } = null!;

    /// <summary>
    /// null if hasn&apos;t checked in
    /// </summary>
    public DateTime? CheckInTime { get; set; }

    /// <summary>
    /// null if hasn&apos;t checked out
    /// </summary>
    public DateTime? CheckOutTime { get; set; }

    public string EmployeeId { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;
}
