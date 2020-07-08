using System.Collections.Generic;
using System.Linq;
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
            var company = await _context.Companies.FirstOrDefaultAsync(c => c.CompanyId == id);
            return company;
        }

        public async Task<Employee> CashierLogin(string username, string password, int CompanyId)
        {
            var cashier = await _context.Employees.Where(x => x.CompanyId == CompanyId).FirstOrDefaultAsync(x => x.Username == username);

            if(cashier == null)
                return null;
            if(!VerifyPasswordHash(password, cashier.PasswordHash, cashier.PasswordSalt))
                return null;
            return cashier;
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

        public async Task<Order> MakeOrder(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            var orderToReturn = await _context.Orders.Include(x => x.Employee).FirstOrDefaultAsync(x => x.OrderId == order.OrderId);
            return orderToReturn;


        }

        public async Task<IEnumerable<Product>> GetProducts(int id)
        {
            var products = await _context.Products.Where(x => x.CompanyId == id).ToListAsync();
            return products;
        }

        public async Task<IEnumerable<Order>> GetUnpaidOrders(int id)
        {
            var orders = await _context.Orders.Where(c => c.IsPaid == false && c.CompanyId == id).Include(x => x.OrderLists).ToListAsync();
            return orders;
        }
    }
}