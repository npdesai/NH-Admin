using Admin.Repository.Interfaces;
using Admin.Repository.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Admin.Repository
{
    public static class RegisterRepositories
    {
        public static void RegisterAdminRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAdminUserRepository, AdminUserRepository>();
            services.AddScoped<ICarouselRepository, CarouselRepository>();
        }
    }
}
