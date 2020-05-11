using System;
using System.Collections.Generic;
using Seed.API.Models;

namespace Seed.API.Dtos
{
    public class CompanyToReturnDto
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyOwner { get; set; }
        public string ContactNumber { get; set; }
        public string CompanyAddress { get; set; }
        public ICollection<ProductToReturnDto> Products { get; set; }
    }
}