using System;

namespace Admin.Models.DTOs
{
    public class UpdateTeamRequestDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
    }
}
