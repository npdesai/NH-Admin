using System;

namespace Admin.Models.DTOs
{
    public class UpdateClientRequestDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Feedback { get; set; }
        public string Location { get; set; }
        public string Image { get; set; }
        public float Rating { get; set; }
        public bool IsActive { get; set; }
    }
}
