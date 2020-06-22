using System.Collections.Generic;

namespace Seed.API.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Product> Products { get; set; }
        public string CustomerNumber { get; set; }
        public string Transaction { get; set; }
        public int Discount { get; set; }
        public int Vat { get; set; }
        public int Subtotal { get; set; }
        public int GrandTotal { get; set; }
        public bool IsPaid { get; set; }
        
    }
}