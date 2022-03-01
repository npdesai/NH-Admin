using Admin.Services.Interfaces;
using Admin.Services.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Admin.Services
{
    public static class RegisterServices
    {
        public static void RegisterAdminServices(this IServiceCollection services)
        {
            services.AddScoped<IAdminUserService, AdminUserService>();
            services.AddScoped<ICarouselService, CarouselService>();
        }
    }
}
