using System;
using System.Collections.Generic;

namespace Repositories.Entities;

    public partial class Manager
    {
        public string ManagerId { get; set; } = null!;

        public string FullName { get; set; } = null!;

        public string Position { get; set; } = null!;

        public DateOnly HireDate { get; set; }

        public string Status { get; set; } = null!;

        public string Image { get; set; } = null!;

        public string AccountId { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public virtual Account Account { get; set; } = null!;

        public virtual ICollection<Application> Applications { get; set; } = new List<Application>();
    }
