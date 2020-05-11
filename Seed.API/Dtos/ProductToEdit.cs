using System;

namespace Seed.API.Dtos
{
    public class ProductToEdit
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public double Price { get; set; }
    }
}