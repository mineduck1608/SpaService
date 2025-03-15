using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Promotion
{
    public string PromotionId { get; set; } = null!;

    public float DiscountValue { get; set; }

    public string PromotionCode { get; set; } = null!;

    public string PromotionName { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
