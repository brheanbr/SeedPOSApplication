using System;

namespace Seed.API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public double Price { get; set; }
        public DateTime ProductCreated { get; set; }
        
    }
}