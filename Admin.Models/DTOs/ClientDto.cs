using System;

namespace Admin.Models.DTOs
{
    public class ClientDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Feedback { get; set; }
        public string Image { get; set; }
        public string Location { get; set; }
        public float Rating { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
