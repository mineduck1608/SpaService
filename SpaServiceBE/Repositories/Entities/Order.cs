﻿using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Order
{
    public string OrderId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public float TotalAmount { get; set; }

    public string? Status { get; set; }

    public string Address { get; set; } = null!;

    public string? RecepientName { get; set; }

    public string? Phone { get; set; }

    public virtual ICollection<CosmeticTransaction> CosmeticTransactions { get; set; } = new List<CosmeticTransaction>();

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
