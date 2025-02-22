using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class ServiceCategory
{
    public string CategoryId { get; set; } = null!;

    public string CategoryName { get; set; } = null!;

    public string CategoryImage { get; set; } = null!;

    public string CategoryDescription { get; set; } = null!;

    public virtual ICollection<CategoryEmployee> CategoryEmployees { get; set; } = new List<CategoryEmployee>();

    public virtual ICollection<Floor> Floors { get; set; } = new List<Floor>();

    public virtual ICollection<News> News { get; set; } = new List<News>();

    public virtual ICollection<SpaService> SpaServices { get; set; } = new List<SpaService>();
}
