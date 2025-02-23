using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class GuestApplication
{
    public string GuestApplicationId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string ApplicationId { get; set; } = null!;

    public virtual Application Application { get; set; } = null!;
}
