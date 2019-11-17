namespace Seed.API.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string CompanyUsername { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string CompanyName { get; set; }
        public string CompanyOwner { get; set; }
        public string ContactNumber { get; set; }
        public string CompanyAddress { get; set; }

    }
}