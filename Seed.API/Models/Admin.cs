namespace Seed.API.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string AccountType { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}