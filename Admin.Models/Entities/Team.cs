using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin.Models.Entities
{
    public class Team
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public Guid Id { get; set; }
        [Column(Order = 1)]
        public string Name { get; set; }
        [Column(Order = 2)]
        public string Title { get; set; }
        [Column(Order = 3)]
        public string Details { get; set; }
        [Column(Order = 4)]
        public string Image { get; set; }
        [Column(Order = 5)]
        public bool IsActive { get; set; } = true;
        [Column(Order = 6)]
        public bool IsDelete { get; set; } = false;
        [Column(Order = 7)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [Column(Order = 8)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
