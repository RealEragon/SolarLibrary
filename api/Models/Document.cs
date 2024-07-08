using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Document
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        public string Description { get; set; } = string.Empty;
        public string? ContentType { get; set; } // Тип содержимого файла (например, image/jpeg, application/pdf)
        public byte[]? Data { get; set; } // Байтовое представление файла
        public DateTime UploadDate { get; set; } // Дата загрузки файла

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int LibraryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        [ForeignKey("LibraryId")]
        public Library? Library { get; set; }
    }
}