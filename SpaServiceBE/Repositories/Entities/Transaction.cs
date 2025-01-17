using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Transaction
{
    public string TransactionId { get; set; } = null!;

    public string TransactionType { get; set; } = null!;

    public float TotalPrice { get; set; }

    public bool Status { get; set; }

    public string? AppointmentId { get; set; }

    public string? PromotionId { get; set; }

    public string? MembershipId { get; set; }

    public virtual Appointment? Appointment { get; set; }

    public virtual ICollection<EmployeeCommission> EmployeeCommissions { get; set; } = new List<EmployeeCommission>();

    public virtual Membership? Membership { get; set; }

    public virtual Promotion? Promotion { get; set; }
}
