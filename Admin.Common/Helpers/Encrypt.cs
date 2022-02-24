using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Admin.Common.Helpers
{
    public static class Encrypt
    {
        public static string EncryptData(string encryptionKey, string plainData)
        {
            byte[] clearBytes = Encoding.Unicode.GetBytes(plainData);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(encryptionKey, new byte[] {
                    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
                });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    plainData = Convert.ToBase64String(ms.ToArray());
                }
            }
            return plainData;
        }
    }
}
