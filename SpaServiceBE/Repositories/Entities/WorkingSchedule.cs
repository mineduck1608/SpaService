using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class WorkingSchedule
{
    public string WorkingScheduleId { get; set; } = null!;

    public DateOnly Date { get; set; }

    public DateTime? CheckInTime { get; set; }

    public DateTime? CheckOutTime { get; set; }

    public string Status { get; set; } = null!;

    public string EmployeeId { get; set; } = null!;

    public string ShiftId { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual Shift Shift { get; set; } = null!;
}
