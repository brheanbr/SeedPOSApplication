using Microsoft.EntityFrameworkCore;
using Seed.API.Models;

namespace Seed.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options){}
        
        public DbSet<Admin> Admin{get; set;}
        public DbSet<Company> Companies{ get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderList> OrderLists { get; set; }

     
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasKey(k => k.OrderId);
            modelBuilder.Entity<Order>()
                .HasOne(k => k.Employee)
                .WithMany(o => o.Orders)
                .HasForeignKey(k => k.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Order>()
                .HasOne(k => k.Company)
                .WithMany(o => o.Orders)
                .HasForeignKey(k => k.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);
          
        //    modelBuilder.Entity<Subscription>()
        //     .HasKey(k => new {k.CompanyId, k.ConnectionStringId});
        //    modelBuilder.Entity<ConnectionStrings>()
        //     .HasKey(k => k.ConnectionStringId);
        //    modelBuilder.Entity<Company>()
        //     .HasKey(k => k.Id); 
        //    modelBuilder.Entity<Subscription>()
        //     .HasOne<Company>(c => c.Company)
        //     .WithOne(c => c.Subscription);
        //    modelBuilder.Entity<Subscription>()
        //     .HasOne<ConnectionStrings>(c => c.ConnectionStrings)
        //     .WithOne(s => s.Subscription);
        //    modelBuilder.Entity<Company>()
        //     .HasOne<Subscription>(s => s.Subscription)
        //     .WithOne(s => s.Company)
        //     .HasForeignKey<Subscription>(s => s.CompanyId); 
        //    modelBuilder.Entity<ConnectionStrings>()
        //     .HasOne<Subscription>(s => s.Subscription)
        //     .WithOne(s => s.ConnectionStrings)
        //     .HasForeignKey<Subscription>(s => s.ConnectionStringId);  
        }

    }


      
    
}