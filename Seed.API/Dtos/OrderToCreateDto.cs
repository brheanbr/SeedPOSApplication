using System;
using System.Collections.Generic;
using Seed.API.Models;

namespace Seed.API.Dtos
{
    public class OrderToCreateDto
    {
        public int EmployeeId { get; set; }
        public int CompanyId { get; set; }
        public ICollection<OrderList> OrderLists { get; set; }
        public string CustomerNumber { get; set; }
        public string Transaction { get; set; }
        public decimal Discount { get; set; }
        public decimal Vat { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal Subtotal { get; set; }
        public bool IsPaid { get; set; }
        public DateTime DateOrdered { get; set; }
    }
}