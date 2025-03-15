using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Application
{
    public string ApplicationId { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string? AccountId { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? ResolvedBy { get; set; }

    public DateTime? ResolvedAt { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<GuestApplication> GuestApplications { get; set; } = new List<GuestApplication>();

    public virtual Account? ResolvedByNavigation { get; set; }
}
