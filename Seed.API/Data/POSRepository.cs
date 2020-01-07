using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Models;

namespace Seed.API.Data
{
    public class POSRepository : IPOSRepository
    {
        private readonly DataContext _context;
        public POSRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
         public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() >0;
        }

        public async Task<Company> GetCompany(int id)
        {
            var company = await _context.Companies.Include(s => s.Subscription).FirstOrDefaultAsync(c => c.Id == id);
            return company;
        }

       
    }
}