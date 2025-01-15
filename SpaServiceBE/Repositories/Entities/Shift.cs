using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Shift
{
    public string ShiftId { get; set; } = null!;

    public string ShiftName { get; set; } = null!;

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public string? Status { get; set; }

    public string? EmployeeId { get; set; }

    public virtual Employee? Employee { get; set; }
}
