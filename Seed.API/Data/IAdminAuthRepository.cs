using System.Collections.Generic;
using System.Threading.Tasks;
using Seed.API.Models;

namespace Seed.API.Data
{
    public interface IAdminAuthRepository
    {
         Task<Admin> RegisterAdmin(Admin admin, string password);
         Task<Admin> Login(string username, string password);
         Task<bool> AdminUserExist(string username);
         Task<Company> RegisterCompany(Company company, string password);
         Task<bool> CompanyUserExist(string username);
         
    }
}