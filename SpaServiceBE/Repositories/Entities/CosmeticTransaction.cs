using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class CosmeticTransaction
{
    public string CosmeticTransactionId { get; set; } = null!;

    public string TransactionId { get; set; } = null!;

    public string OrderId { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;

    public virtual Transaction Transaction { get; set; } = null!;
}