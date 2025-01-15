using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Customer
{
    public string CustomerId { get; set; } = null!;

    public string? AccountId { get; set; }

    public string FullName { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public string? MembershipLevel { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
}
