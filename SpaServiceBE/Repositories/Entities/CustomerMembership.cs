using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CustomerMembership
{
    public string CustomerId { get; set; } = null!;

    public string MembershipId { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Membership Membership { get; set; } = null!;
}
