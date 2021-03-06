using System;
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
        public ICollection<OrderList> OrderLists { get; set; }
        public string CustomerNumber { get; set; }
        public string Transaction { get; set; }
        public decimal Discount { get; set; }
        public decimal Vat { get; set; }
        public decimal Subtotal { get; set; }
        public decimal GrandTotal { get; set; }
        public bool IsPaid { get; set; }
        public DateTime DateOrdered { get; set; }
        
    }
}