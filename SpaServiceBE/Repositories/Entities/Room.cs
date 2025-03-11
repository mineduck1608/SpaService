using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Room
{
    public string RoomId { get; set; } = null!;

    public int RoomNum { get; set; }

    public string FloorId { get; set; } = null!;

    public bool Status { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual Floor Floor { get; set; } = null!;
}
