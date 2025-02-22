using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CosmeticProductCategory
{
    public string ProductCategoryId { get; set; } = null!;

    public string CosmeticCategoryId { get; set; } = null!;

    public string CosmeticProductId { get; set; } = null!;

    public virtual CosmeticCategory CosmeticCategory { get; set; } = null!;

    public virtual CosmeticProduct CosmeticProduct { get; set; } = null!;
}
