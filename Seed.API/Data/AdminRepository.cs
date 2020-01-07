using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Models;
using Seed.API.Models.CompanyModels;

namespace Seed.API.Data
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;
        private readonly CompanyDataContext _companyContext;
        public AdminRepository(DataContext context, CompanyDataContext companyContext)
        {
            _companyContext = companyContext;
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

        public async Task<Subscription> Subscribe(Subscription subscription)
        {
            await _context.Subscriptions.AddAsync(subscription);
            await _context.SaveChangesAsync();
            return subscription;
        }

        public async Task<bool> IsSubscribed(int Id)
        {
            if (await _context.Subscriptions.AnyAsync(s => s.CompanyId == Id))
                return true;
            return false;
        }

        public async Task<IEnumerable<Company>> GetCompanies()
        {
            var companies = await _context.Companies.Include(s => s.Subscription).ToListAsync();
            return companies;
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = await _companyContext.Employees.ToListAsync();
            return employees;

        }

        public async Task<Company> GetCompany(int id)
        {
            var company = await _context.Companies.Include(s => s.Subscription).FirstOrDefaultAsync(c => c.Id == id);
            return company;
        }
    }
}