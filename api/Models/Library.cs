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
        public string Description { get; set; } = string.Empty;
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ActivityId { get; set; }

         [ForeignKey("UserId")]
        public User? User { get; set; }

         [ForeignKey("ActivityId")]
        public Activity? Activity { get; set; }
    }
}