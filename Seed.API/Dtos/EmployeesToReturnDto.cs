using System;

namespace Seed.API.Dtos
{
    public class EmployeesToReturnDto
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
        public int CompanyId { get; set; }
    }
}