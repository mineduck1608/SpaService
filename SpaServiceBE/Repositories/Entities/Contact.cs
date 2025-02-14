using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Contact
{
    public string ContactId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? ContactContent { get; set; }

    public bool IsProcessed { get; set; }
}
