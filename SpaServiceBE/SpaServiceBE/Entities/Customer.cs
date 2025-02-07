using System;
using System.Collections.Generic;

namespace SpaServiceBE.Entities;

public partial class Customer
{
    public string CustomerId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public string? MembershipId { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Membership? Membership { get; set; }

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
