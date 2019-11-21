using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Models;

namespace Seed.API.Data
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _context;

        public CompanyRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<Company> Login(string username, string password)
        {
            var companies = await _context.Companies.FirstOrDefaultAsync(x => x.CompanyUsername == username);

            if (companies == null)
                return null;
            if (!VerifyPasswordHash(password, companies.PasswordHash, companies.PasswordSalt))
                return null;
            return companies;
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
              using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
               
               var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
               for (int i = 0; i < computedHash.Length; i++){
                   if(computedHash[i] != passwordHash[i]) return false;
               }
            }
            return true;
        }
    }
}