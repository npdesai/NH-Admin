using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin.Models.Entities
{
    public class Carousel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public Guid Id { get; set; }
        [Column(Order = 1)]
        public string Title { get; set; }
        [Column(Order = 2)]
        public string Description { get; set; }
        [Column(Order = 3)]
        public string Image { get; set; }
        [Column(Order = 4)]
        public bool IsActive { get; set; } = true;
        [Column(Order = 5)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [Column(Order = 6)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
