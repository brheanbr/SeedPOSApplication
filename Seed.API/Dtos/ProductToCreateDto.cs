using System;

namespace Seed.API.Dtos
{
    public class ProductToCreateDto
    {
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public double Price { get; set; }
        public DateTime ProductCreated { get; set; }
        public int CompanyId { get; set; }
    }
}