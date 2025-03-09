using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CartCosmeticProduct
{
    public string Id { get; set; } = null!;

    public string CustomerId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public int Quantity { get; set; }
    public bool Included { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual CosmeticProduct Product { get; set; } = null!;
}
