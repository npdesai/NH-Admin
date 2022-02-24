using Admin.Common.Settings;
using Microsoft.Extensions.Configuration;

namespace Admin.Common
{
    public class MemCache
    {
        public static AppSettingsConfig AppSettings { get; private set; }
        public static AdminSettingsConfig AdminSettings { get; private set; }
        public static JwtSettingsConfig JwtSettings { get; private set; }

        public static void SetConfiguration(IConfiguration configuration)
        {
            AppSettings = new AppSettingsConfig();
            AdminSettings = new AdminSettingsConfig();
            JwtSettings = new JwtSettingsConfig();

            if (configuration == null)
            {
                return;
            }

            foreach (var propertyInfo in typeof(AppSettingsConfig).GetProperties())
            {
                propertyInfo.SetValue(AppSettings, configuration[$"AppSettings:{propertyInfo.Name}"]);
            }

            foreach (var propertyInfo in typeof(AdminSettingsConfig).GetProperties())
            {
                propertyInfo.SetValue(AdminSettings, configuration[$"AdminSettings:{propertyInfo.Name}"]);
            }

            foreach (var propertyInfo in typeof(JwtSettingsConfig).GetProperties())
            {
                propertyInfo.SetValue(JwtSettings, configuration[$"JwtSettings:{propertyInfo.Name}"]);
            }
        }
    }
}
