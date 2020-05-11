using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Models;

namespace Seed.API.Data
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;
        public AdminRepository(DataContext context)
        {

            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<IEnumerable<Company>> GetCompanies()
        {
            var companies = await _context.Companies.ToListAsync();
            return companies;
        }

        public async Task<Company> GetCompany(int id)
        {
            var company = await _context.Companies.Include(p => p.Products).FirstOrDefaultAsync(c => c.CompanyId == id);
            return company;
        }

        public async Task<Product> RegisterProduct(Product product)
        {   product.ProductCreated = System.DateTime.Now;
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            var productToReturn = await _context.Products.FirstOrDefaultAsync(x => x.ProductName == product.ProductName && x.CompanyId == product.CompanyId);
            return(productToReturn);
        }

        public async Task<bool> ProductExist(string ProductName, int CompanyId)
        {
            if(await _context.Products.Where(x => x.ProductName == ProductName).AnyAsync(x =>x.CompanyId == CompanyId))
                return true;
            return false;
        }

        public async Task<IEnumerable<Product>> GetProducts(int id)
        {
            var productToReturn = await _context.Products.Where(x => x.CompanyId == id).ToListAsync();
            return(productToReturn);
        }

        public async Task<Product> GetProduct(int id)
        {
            var productToReturn = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            return (productToReturn);
        }
    }
}