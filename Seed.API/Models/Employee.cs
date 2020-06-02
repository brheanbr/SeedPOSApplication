using System;

namespace Seed.API.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public string EmployeeType { get; set; }
        public string EmployeeCode { get; set; }
        public DateTime DateRegistered { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public Company Company { get; set; }
        public int CompanyId { get; set; }

    }
}