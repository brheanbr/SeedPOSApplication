using System.Threading.Tasks;
using Seed.API.Models;

namespace Seed.API.Data
{
    public interface ICompanyRepository
    {
         Task<Company> Login(string companyUsername, string password);
    }
}