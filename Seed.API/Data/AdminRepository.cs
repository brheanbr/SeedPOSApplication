using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Dtos;
using Seed.API.Helpers;
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
            var company = await _context.Companies.Include(p => p.Products).Include(x => x.Employees).FirstOrDefaultAsync(c => c.CompanyId == id);
            return company;
        }

        public async Task<Product> RegisterProduct(Product product)
        {   product.ProductCreated = System.DateTime.Now;
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            var productToReturn = await _context.Products.FirstOrDefaultAsync(x => x.ProductName == product.ProductName && x.CompanyId == product.CompanyId);
            return(productToReturn);
        }
        public async Task<bool> ToRegisterProductExist(string ProductName, int CompanyId)
        {
            if(await _context.Products.Where(x => x.ProductName == ProductName).AnyAsync(x => x.CompanyId == CompanyId))
                return true;
            return false;
        }

        public async Task<bool> ProductExist(string ProductName, int Id, int CompanyId)
        {
            if(await _context.Products.Where(x => x.ProductName == ProductName && x.CompanyId == CompanyId).AnyAsync(x => x.Id != Id))
                return true;
            return false;
        }
        
        public async Task<IEnumerable<Product>> GetProducts(int id)
        {
            var products = await _context.Products.Where(x => x.CompanyId == id).ToListAsync();
            return products;
        }
        //(IF GETTING THE PRODUCT WITH QUERY PARAMS)
        // public async Task<PageList<Product>> GetProducts(ProductParams productParams, int id)
        // {
        //     var productToReturn =  _context.Products.Where(x => x.CompanyId == id);
        //     return await PageList<Product>.CreateAsync(productToReturn, productParams.PageNumber, productParams.PageSize);
        // }

        public async Task<Product> GetProduct(int id)
        {
            var productToReturn = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            return (productToReturn);
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

        public async Task<Employee> RegisterEmployee(Employee employee, string password)
        {
            employee.DateRegistered = System.DateTime.Now;
            if(password != null)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);
                employee.PasswordHash = passwordHash;
                employee.PasswordSalt = passwordSalt;
            }
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<IEnumerable<Employee>> GetEmployees(int CompanyId)
        {
            var employees = await _context.Employees.Where(x => x.CompanyId == CompanyId).ToListAsync();
            return employees;
        }

        public async Task<bool> EmployeeUsernameExist(string Username, int CompanyId)
        {
           if(await _context.Employees.Where(x => x.Username == Username).AnyAsync(x => x.CompanyId == CompanyId))
            return true;
            return false;

        }

        public async Task<Employee> GetEmployee(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
            return(employee);
        }
    }
}