using System.Threading.Tasks;
using Seed.API.Models;

namespace Seed.API.Data
{
    public class CompanyRepository : ICompanyRepository
    {
        public Task<Company> Login(string companyUsername, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}