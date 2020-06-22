using System.Collections.Generic;
using Seed.API.Models;

namespace Seed.API.Dtos
{
    public class OrderToCreateDto
    {
        public int EmployeeId { get; set; }
        public int CompanyId { get; set; }
        public ICollection<Product> Products { get; set; }
        public string CustomerNumber { get; set; }
        public string Transaction { get; set; }
        public int Discount { get; set; }
        public int Vat { get; set; }
        public int GrandTotal { get; set; }
        public int SubTotal { get; set; }
        public bool IsPaid { get; set; }
    }
}