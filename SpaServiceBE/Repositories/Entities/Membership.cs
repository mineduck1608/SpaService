using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Membership
{
    public string MembershipId { get; set; } = null!;

    public string Type { get; set; } = null!;

    public float Min { get; set; }

    public float Max { get; set; }

    public int Discount { get; set; }

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
