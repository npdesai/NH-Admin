using Admin.Models.Entities;
using Admin.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Admin.Repository.Repositories
{
    public class AdminUserRepository : IAdminUserRepository
    {
        private readonly AdminDBContext _dbContext;

        public AdminUserRepository(AdminDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AdminUser> GetUserByUserName(string userName)
        {
            return await _dbContext.AdminUsers.FirstOrDefaultAsync(au => au.UserName == userName);
        }
    }
}
