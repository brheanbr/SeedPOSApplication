using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Models.CompanyModels;

namespace Seed.API.Data
{
    public class CompanyDataContext : DbContext
    {

        public CompanyDataContext(DbContextOptions<CompanyDataContext> options) : base(options) { }


        public DbSet<Employee> Employees { get; set; }
        public string _ConnectionString { get; set;}

        // public CompanyDataContext(string ConnectionString)
        // {
        //     _ConnectionString = ConnectionString;
        // }

        public void connectionString(string conString)
        {
            _ConnectionString = conString;


        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            // if (!optionsBuilder.IsConfigured)
            // {
            //     optionsBuilder.UseSqlServer(_ConnectionString);
            //     base.OnConfiguring(optionsBuilder);
            // }

            // if (optionsBuilder.IsConfigured)
            // {
              
            //     optionsBuilder.UseSqlServer(_ConnectionString);
            //     base.OnConfiguring(optionsBuilder);
                
            // }
        }


    }
}