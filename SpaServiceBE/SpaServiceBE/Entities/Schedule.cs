using System;
using System.Collections.Generic;

namespace SpaServiceBE.Entities;

public partial class Schedule
{
    public string ScheduleId { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    /// <summary>
    /// null if hasn&apos;t checked in
    /// </summary>
    public DateTime? CheckInTime { get; set; }

    /// <summary>
    /// null if hasn&apos;t checked out
    /// </summary>
    public DateTime? CheckOutTime { get; set; }

    public string Status { get; set; } = null!;

    public string EmployeeId { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;
}
