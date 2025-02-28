using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Commission
{
    public string CommissionId { get; set; } = null!;

    public int Percentage { get; set; }

    public virtual ICollection<EmployeeCommission> EmployeeCommissions { get; set; } = new List<EmployeeCommission>();
}
