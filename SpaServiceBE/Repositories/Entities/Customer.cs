using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Customer
{
    public string CustomerId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<CustomerMembership> CustomerMemberships { get; set; } = new List<CustomerMembership>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
