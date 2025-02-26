using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CosmeticProduct
{
    public string ProductId { get; set; } = null!;

    public string ProductName { get; set; } = null!;

    public float? Price { get; set; }

    public int Quantity { get; set; }

    public string Description { get; set; } = null!;

    public bool Status { get; set; }

    public bool IsSelling { get; set; }

    public string? Image { get; set; }

    public string CategoryId { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public virtual CosmeticCategory Category { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
