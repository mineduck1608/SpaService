using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CategoryEmployee
{
    public string CategoryEmployeeId { get; set; } = null!;

    public string CategoryId { get; set; } = null!;

    public string EmployeeId { get; set; } = null!;

    public virtual ServiceCategory Category { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;
}
