using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Models;

namespace Seed.API.Data
{
    public class AdminAuthRepository : IAdminAuthRepository
    {
        private readonly DataContext _context;
        public AdminAuthRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<Admin> Login(string username, string password)
        {
            var user = await _context.Admin.FirstOrDefaultAsync(x => x.Username == username);

            if(user == null)
                return null;
            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
            return user;
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

        public async Task<Admin> RegisterAdmin(Admin admin, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            admin.PasswordHash = passwordHash;
            admin.PasswordSalt = passwordSalt;

            await _context.Admin.AddAsync(admin);
            await _context.SaveChangesAsync();

            return admin;

        }

        public async Task<bool> AdminUserExist(string username)
        {
            if(await _context.Admin.AnyAsync(x => x.Username == username))
                return true;
            return false;
            
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            };
        }

        public async Task<bool> CompanyUserExist(string username)
        {
            if(await _context.Companies.AnyAsync(x => x.CompanyUsername == username))
                return true;
            return false;
        }

        public async Task<Company> RegisterCompany(Company company, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            company.PasswordHash = passwordHash;
            company.PasswordSalt = passwordSalt;

            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
            return company;

        }

        public async Task<IEnumerable<Company>> GetCompanies()
        {
            var companies = await _context.Companies.Include(s => s.Subscription).ToListAsync();
            return companies;
        }
    }
}