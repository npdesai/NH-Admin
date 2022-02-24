using System.ComponentModel.DataAnnotations;

namespace Admin.Models.DTOs
{
    public class AdminLoginRequestDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
