using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin.Models.Entities
{
    public class Client
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public Guid Id { get; set; }
        [Column(Order = 1)]
        public string Name { get; set; }
        [Column(Order = 2)]
        public string Feedback { get; set; }
        [Column(Order = 3)]
        public string Image { get; set; }
        [Column(Order = 4)]
        public string Location { get; set; }
        [Column(Order = 5)]
        public float Rating { get; set; }
        [Column(Order = 6)]
        public bool IsActive { get; set; } = true;
        [Column(Order = 7)]
        public bool IsDelete { get; set; } = false;
        [Column(Order = 8)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [Column(Order = 9)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
