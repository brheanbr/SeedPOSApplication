using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Seed.API.Models.CompanyModels;

namespace Seed.API.Data
{
    public class CompanyDataContext : DbContext
    {
        public string _connString { get; }
        public CompanyDataContext(DbContextOptions<CompanyDataContext> options) : base (options){}

        public CompanyDataContext(string ConnString)
        {
            _connString = ConnString;
        }

        public DbSet<Employee> Employees { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
            
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server=DESKTOP-DVFRMBL\\SQLEXPRESS;database=2006KabacanDB;Trusted_Connection=true");
            }
            // if (!optionsBuilder.IsConfigured)
            // {
            //     optionsBuilder.UseSqlServer(_connString);
            //     base.OnConfiguring(optionsBuilder);
            // }
        }

    }
}