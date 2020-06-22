using System.Collections.Generic;
using System.Threading.Tasks;
using Seed.API.Models;

namespace Seed.API.Data
{
    public interface IPOSRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<Company> GetCompany(int id);
         Task<Employee> CashierLogin(string username, string password, int CompanyId);
         Task<IEnumerable<Order>> MakeOrder(Order order);
    }
    
}