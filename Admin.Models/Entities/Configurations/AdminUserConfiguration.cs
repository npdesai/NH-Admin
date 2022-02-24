using Admin.Common.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Admin.Models.Entities.Configurations
{
    public class AdminUserConfiguration : IEntityTypeConfiguration<AdminUser>
    {
        public void Configure(EntityTypeBuilder<AdminUser> builder)
        {
            builder.Property(au => au.UserName)
                .IsRequired();
            builder.Property(au => au.Password)
                .IsRequired();

            builder.HasData(
                new AdminUser
                {
                    Id = Guid.NewGuid(),
                    UserName = "admin",
                    Password = Password.ComputeHash("@dmin#", "SHA512", null),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                }
           );
        }
    }
}
