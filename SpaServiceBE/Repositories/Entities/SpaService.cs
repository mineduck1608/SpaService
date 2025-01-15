using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class SpaService
{
    public string ServiceId { get; set; } = null!;

    public string ServiceName { get; set; } = null!;

    public double Price { get; set; }

    public TimeOnly Duration { get; set; }

    public string? CategoryId { get; set; }

    public string Description { get; set; } = null!;

    public string? ServiceImage { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
}
