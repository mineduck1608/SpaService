using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Appointment
{
    public string AppointmentId { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public string Status { get; set; } = null!;

    public string RequestId { get; set; } = null!;

    public string EmployeeId { get; set; } = null!;

    public DateTime? UpdatedAt { get; set; }

    public string RoomId { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Request Request { get; set; } = null!;

    public virtual Room Room { get; set; } = null!;
}
