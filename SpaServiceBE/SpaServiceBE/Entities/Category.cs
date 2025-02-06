using System;
using System.Collections.Generic;

namespace SpaServiceBE.Entities;

public partial class Category
{
    public string CategoryId { get; set; } = null!;

    public string CategoryName { get; set; } = null!;

    public string CategoryImage { get; set; } = null!;

    public string CategoryDescription { get; set; } = null!;

    public virtual ICollection<SpaService> SpaServices { get; set; } = new List<SpaService>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
