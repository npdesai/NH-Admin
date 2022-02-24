namespace Admin.Common.Settings
{
    public class JwtSettingsConfig
    {
        public string Secret { get; set; }
        public string TokenExpiryMinute { get; set; }
    }
}
