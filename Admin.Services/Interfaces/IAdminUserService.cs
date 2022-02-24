using System.Threading.Tasks;

namespace Admin.Services.Interfaces
{
    public interface IAdminUserService
    {
        Task<string> AdminLogin(string userName, string password);
    }
}
