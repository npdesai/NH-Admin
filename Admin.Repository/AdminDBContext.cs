using Admin.Models.Entities;
using Admin.Models.Entities.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Admin.Repository
{
    public class AdminDBContext : DbContext
    {
        public AdminDBContext() { }

        public AdminDBContext(DbContextOptions<AdminDBContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (optionsBuilder.IsConfigured == false)
            {
                optionsBuilder.UseNpgsql(@"Host=localhost;Database=NH_Admin;Username=postgres;Password=postgress;Port=5432;");
            }
        }

        public DbSet<AdminUser> AdminUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new AdminUserConfiguration());
        }
    }
}
