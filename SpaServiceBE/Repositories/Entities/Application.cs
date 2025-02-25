﻿using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Application
{
    public string ApplicationId { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public string? ResolvedBy { get; set; }

    public DateTime? ResolvedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<GuestApplication> GuestApplications { get; set; } = new List<GuestApplication>();

    public virtual Manager? ResolvedByNavigation { get; set; }
}
