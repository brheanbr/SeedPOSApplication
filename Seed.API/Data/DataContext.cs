using Microsoft.EntityFrameworkCore;
using Seed.API.Models;

namespace Seed.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options){}
        
        public DbSet<Admin> Admin{get; set;}
        public DbSet<Company> Companies{ get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        // public DbSet<ConnectionStrings> ConnectionStrings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server=DESKTOP-DVFRMBL\\SQLEXPRESS;database=SeedDB;Trusted_Connection=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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