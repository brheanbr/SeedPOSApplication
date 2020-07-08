using System.Collections.Generic;
using System.Threading.Tasks;
using Seed.API.Dtos;
using Seed.API.Helpers;
using Seed.API.Models;

namespace Seed.API.Data
{
    public interface IAdminRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();

        //Company
        Task<Company> RegisterCompany(Company company, string password);
        Task<IEnumerable<Company>> GetCompanies();
        Task<Company> GetCompany(int id);

        //Product
        
        Task<IEnumerable<Product>> GetProducts(int id);
        // Task<PageList<Product>> GetProducts(ProductParams productParams, int id); (IF GETTING THE PRODUCT WITH QUERY PARAMS)
        Task<Product> GetProduct(int id);
        Task<bool> ToRegisterProductExist(string ProductName, int CompanyId);
        Task<bool> ProductExist(string ProductName, int Id, int CompanyId);
        Task<Product> RegisterProduct(Product product);

        //Employee
        Task<bool> CompanyUserExist(string username);
        Task<Employee> RegisterEmployee(Employee employee, string password);
        Task<bool> EmployeeUsernameExist(string Username, int CompanyId);
        Task<IEnumerable<Employee>> GetEmployees(int CompanyId);
        Task<Employee> GetEmployee(int id);
    }
}