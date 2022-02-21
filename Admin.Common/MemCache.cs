using Microsoft.Extensions.Configuration;

namespace Admin.Common
{
    public class MemCache
    {
        public static AppSettingsConfig AppSettings { get; private set; }

        public static void SetConfiguration(IConfiguration configuration)
        {
            AppSettings = new AppSettingsConfig();

            if (configuration == null)
            {
                return;
            }

            foreach (var propertyInfo in typeof(AppSettingsConfig).GetProperties())
            {
                propertyInfo.SetValue(AppSettings, configuration[$"AppSettings:{propertyInfo.Name}"]);
            }
        }
    }
}
