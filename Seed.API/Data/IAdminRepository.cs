using System.Collections.Generic;
using System.Threading.Tasks;
using Seed.API.Models;

namespace Seed.API.Data
{
    public interface IAdminRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Company>> GetCompanies();
        Task<Company> GetCompany(int id);
    }
}