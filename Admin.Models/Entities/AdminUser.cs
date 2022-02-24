using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin.Models.Entities
{
    public class AdminUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public Guid Id { get; set; }
        [Column(Order = 1)]
        public string UserName { get; set; }
        [Column(Order = 2)]
        public string Password { get; set; }
        [Column(Order = 3)]
        public DateTime CreatedAt { get; set; }
        [Column(Order = 4)]
        public DateTime UpdatedAt { get; set; }
    }
}
