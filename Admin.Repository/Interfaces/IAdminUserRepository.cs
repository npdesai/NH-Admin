using Admin.Models.Entities;
using System.Threading.Tasks;

namespace Admin.Repository.Interfaces
{
    public interface IAdminUserRepository
    {
        Task<AdminUser> GetUserByUserName(string userName);
    }
}
