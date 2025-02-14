using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Application
{
    public string ApplicationId { get; set; } = null!;

    public string Content { get; set; } = null!;

    public bool IsPending { get; set; }

    public bool? IsApproved { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual Employee CreatedByNavigation { get; set; } = null!;
}
