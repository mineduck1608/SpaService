using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Transaction
{
    public string TransactionId { get; set; } = null!;

    public string TransactionType { get; set; } = null!;

    public float TotalPrice { get; set; }

    public bool Status { get; set; }

    public DateTime? CompleteTime { get; set; }

    public string? PromotionId { get; set; }

    public string PaymentType { get; set; } = null!;

    public virtual ICollection<CosmeticTransaction> CosmeticTransactions { get; set; } = new List<CosmeticTransaction>();

    public virtual Promotion? Promotion { get; set; }

    public virtual ICollection<ServiceTransaction> ServiceTransactions { get; set; } = new List<ServiceTransaction>();
}
