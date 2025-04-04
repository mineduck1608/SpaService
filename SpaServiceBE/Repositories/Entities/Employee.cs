﻿using System;
using System.Collections.Generic;

namespace Repositories.Entities;

public partial class Employee
{
    public string EmployeeId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Position { get; set; } = null!;

    public DateOnly HireDate { get; set; }

    public string Status { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<AttendanceRecord> AttendanceRecords { get; set; } = new List<AttendanceRecord>();

    public virtual ICollection<CategoryEmployee> CategoryEmployees { get; set; } = new List<CategoryEmployee>();

    public virtual ICollection<EmployeeCommission> EmployeeCommissions { get; set; } = new List<EmployeeCommission>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
