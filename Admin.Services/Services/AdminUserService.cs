using Admin.Common;
using Admin.Common.Constants;
using Admin.Common.Helpers;
using Admin.Models.Entities;
using Admin.Repository.Interfaces;
using Admin.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace Admin.Services.Services
{
    public class AdminUserService : IAdminUserService
    {
        private readonly IAdminUserRepository _adminUserRepository;

        public AdminUserService(IAdminUserRepository adminUserRepository)
        {
            _adminUserRepository = adminUserRepository;
        }

        public async Task<string> AdminLogin(string userName, string password)
        {
            AdminUser adminUser = await _adminUserRepository.GetUserByUserName(userName);

            if (adminUser == null)
            {
                throw new Exception(Messages.MSG_ADMIN_INVALID_CREDENTIAL);
            }

            bool isVerified = Password.VerifyHash(password, "SHA512", adminUser.Password);

            if (isVerified)
            {
                string token = Token.GenerateToken(adminUser.Id);
                string encryptToken = Encrypt.EncryptData(MemCache.AppSettings.EncryptionKey, token);
                return encryptToken;
            }
            else
            {
                throw new Exception(Messages.MSG_ADMIN_INVALID_CREDENTIAL);
            }
        }
    }
}
