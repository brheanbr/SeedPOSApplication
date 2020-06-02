using System;
using System.ComponentModel.DataAnnotations;

namespace Seed.API.Dtos
{
    public class EmployeeForRegisterDto
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string EmployeeType { get; set; }
        public string EmployeeCode { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public DateTime DateRegistered { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }
        [Required]
        public int CompanyId { get; set; }
    }
}