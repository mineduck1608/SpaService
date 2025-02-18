using Repositories.Entities;

public class CategoryEmployee
{
    public string CategoryId { get; set; }
    public string EmployeeId { get; set; }

    // Navigation properties
    public virtual Category Category { get; set; }
    public virtual Employee Employee { get; set; }
}