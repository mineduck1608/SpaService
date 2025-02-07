using System;
using System.Collections.Generic;

namespace SpaServiceBE.Entities;

public partial class Appointment
{
    public string AppointmentId { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string RequestId { get; set; } = null!;

    public string EmployeeId { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual Request Request { get; set; } = null!;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
