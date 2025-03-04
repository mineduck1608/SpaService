using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Feedback
{
    public string FeedbackId { get; set; } = null!;

    public string FeedbackMessage { get; set; } = null!;

    public byte Rating { get; set; }

    public DateTime CreatedAt { get; set; }

    public string CreatedBy { get; set; } = null!;

    public string? AppointmentId { get; set; }

    public virtual Appointment? Appointment { get; set; }

    public virtual Customer CreatedByNavigation { get; set; } = null!;
}
