using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Feedback
{
    public string FeedbackId { get; set; } = null!;

    public string FeedbackMessage { get; set; } = null!;

    public int Rate { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? ServiceId { get; set; }

    public string? CustomerId { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual SpaService? Service { get; set; }
}
