using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CosmeticCategory
{
    public string CategoryId { get; set; } = null!;

    public string CategoryName { get; set; } = null!;

    public string CategoryDescription { get; set; } = null!;

    public virtual ICollection<CosmeticProduct> CosmeticProducts { get; set; } = new List<CosmeticProduct>();
}
