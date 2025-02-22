using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class ServiceTransaction
{
    public string ServiceTransactionId { get; set; } = null!;

    public string TransactionId { get; set; } = null!;

    public string RequestId { get; set; } = null!;

    public string? MembershipId { get; set; }

    public virtual ICollection<EmployeeCommission> EmployeeCommissions { get; set; } = new List<EmployeeCommission>();

    public virtual Membership? Membership { get; set; }

    public virtual Request Request { get; set; } = null!;

    public virtual Transaction Transaction { get; set; } = null!;
}
