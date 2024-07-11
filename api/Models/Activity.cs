using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Activity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public string Description { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; }

        [Required]
        public int LibraryId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("LibraryId")]
        public Library? Library { get; set; }

        internal object? ToActivityDto()
        {
            throw new NotImplementedException();
        }
    }
}