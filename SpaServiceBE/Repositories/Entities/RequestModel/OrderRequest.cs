using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Entities.RequestModel
{
    public class OrderRequest
    {
        public string CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public string Address { get; set; }
        public List<OrderDetailRequest> Details { get; set; }
        public string PaymentType { get; set; }
        public string? PromotionCode { get; set; }
        public string? RecepientName { get; set; }
        public string? Phone { get; set; }
    }
    public class OrderDetailRequest
    {
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
