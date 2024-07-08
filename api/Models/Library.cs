using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Library
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        [Required]
        public string? Name { get; set; }
        public string Description { get; set; } = string.Empty;
        [Required]
        public bool IsPublic { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int CategoryId { get; set; }

         [ForeignKey("UserId")]
        public User? User { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}