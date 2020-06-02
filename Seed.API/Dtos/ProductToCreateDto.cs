using System;
using System.ComponentModel.DataAnnotations;

namespace Seed.API.Dtos
{
    public class ProductToCreateDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public double Price { get; set; }
        public DateTime ProductCreated { get; set; }
        
        [Required]
        public int CompanyId { get; set; }
    }
}