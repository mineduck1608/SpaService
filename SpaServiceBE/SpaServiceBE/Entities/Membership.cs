using System;
using System.Collections.Generic;

namespace SpaServiceBE.Entities;

public partial class Membership
{
    public string MembershipId { get; set; } = null!;

    public string? Type { get; set; }

    public int Discount { get; set; }

    public double? TotalPayment { get; set; }

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
