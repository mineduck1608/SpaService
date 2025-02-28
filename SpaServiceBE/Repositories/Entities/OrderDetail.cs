using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class OrderDetail
{
    public int Quantity { get; set; }

    public float SubTotalAmount { get; set; }

    public string OrderId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public string OrderDetailId { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;

    public virtual CosmeticProduct Product { get; set; } = null!;
}
