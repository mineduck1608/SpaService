using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Membership
{
    public string MembershipId { get; set; } = null!;

    public string Type { get; set; } = null!;

    public float TotalPayment { get; set; }

    public int Discount { get; set; }

    public virtual ICollection<CustomerMembership> CustomerMemberships { get; set; } = new List<CustomerMembership>();

    public virtual ICollection<ServiceTransaction> ServiceTransactions { get; set; } = new List<ServiceTransaction>();
}
