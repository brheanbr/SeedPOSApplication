using System.ComponentModel.DataAnnotations;

namespace Seed.API.Dtos
{
    public class AdminForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password Lenght is 4 to 8 characters")]
        public string Password { get; set; }
        public string AccountType { get; set; }
    }
}