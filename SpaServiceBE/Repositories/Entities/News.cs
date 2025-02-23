using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class News
{
    public string NewsId { get; set; } = null!;

    public string Header { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string CategoryId { get; set; } = null!;

    public virtual ServiceCategory Category { get; set; } = null!;
}
