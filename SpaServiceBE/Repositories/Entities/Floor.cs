using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Floor
{
    public string FloorId { get; set; } = null!;

    public int FloorNum { get; set; }

    public string CategoryId { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public virtual ServiceCategory Category { get; set; } = null!;

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
