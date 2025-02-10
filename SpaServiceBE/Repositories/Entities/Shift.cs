using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Shift
{
    public string ShiftId { get; set; } = null!;

    public string ShiftName { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<WorkingSchedule> WorkingSchedules { get; set; } = new List<WorkingSchedule>();
}
