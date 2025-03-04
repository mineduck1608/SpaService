using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class SpaService
{
    public string ServiceId { get; set; } = null!;

    public string ServiceName { get; set; } = null!;

    public float Price { get; set; }

    public TimeOnly Duration { get; set; }

    public string Description { get; set; } = null!;

    public string ServiceImage { get; set; } = null!;

    public string CategoryId { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public virtual ServiceCategory Category { get; set; } = null!;

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
