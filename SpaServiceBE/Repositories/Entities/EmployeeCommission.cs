using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class EmployeeCommission
{
    public string EmployeeId { get; set; } = null!;

    public string CommissionId { get; set; } = null!;

    public string TransactionId { get; set; } = null!;

    public float CommissionValue { get; set; }

    public string ServiceTransactionId { get; set; } = null!;

    public virtual Commission Commission { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual ServiceTransaction ServiceTransaction { get; set; } = null!;
}
