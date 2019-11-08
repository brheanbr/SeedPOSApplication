using System.Threading.Tasks;
using Seed.API.Models;

namespace Seed.API.Data
{
    public interface IAdminAuthRepository
    {
         Task<Admin> Register(Admin admin, string password);
         Task<Admin> Login(string username, string password);
         Task<bool> UserExist(string username);
    }
}