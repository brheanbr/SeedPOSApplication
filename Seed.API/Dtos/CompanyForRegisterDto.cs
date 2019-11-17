using System.ComponentModel.DataAnnotations;

namespace Seed.API.Dtos
{
    public class CompanyForRegisterDto
    {   
        [Required]
        public string CompanyUsername { get; set; }
        
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password Lenght is 4 to 8 characters")]
        public string CompanyPassword { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string CompanyOwner { get; set; }
        public string ContactNumber { get; set; }
        public string CompanyAddress { get; set; }
    }
}