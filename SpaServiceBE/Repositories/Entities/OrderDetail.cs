using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class OrderDetail
{
    public int OrderDetailId { get; set; }

    public float Quantity { get; set; }

    public float SubtotalAmount { get; set; }

    public string OrderId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;

    public virtual CosmeticProduct Product { get; set; } = null!;
}
