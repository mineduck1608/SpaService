using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Account
{
    public string AccountId { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string? Password { get; set; } = null;

    public bool Status { get; set; }

    public DateTime CreatedAt { get; set; }

    public string RoleId { get; set; } = null!;

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual Role Role { get; set; } = null!;
}
