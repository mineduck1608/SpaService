using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CategoryEmployee
{
    public int Id { get; set; }

    public string? CategoryId { get; set; }

    public string? EmployeeId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Employee? Employee { get; set; }
}
