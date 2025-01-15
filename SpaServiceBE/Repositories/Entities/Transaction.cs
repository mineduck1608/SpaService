using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Transaction
{
    public string TransactionId { get; set; } = null!;

    public string TransactionType { get; set; } = null!;

    public double TotalPrice { get; set; }

    public string? AppointmentId { get; set; }

    public bool TransactionStatus { get; set; }

    public string? PromotionId { get; set; }

    public virtual Appointment? Appointment { get; set; }

    public virtual Promotion? Promotion { get; set; }
}
