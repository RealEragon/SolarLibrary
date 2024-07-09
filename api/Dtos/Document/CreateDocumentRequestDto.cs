using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Document
{
    public class CreateDocumentRequestDto
    {
        public string? Title { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? ContentType { get; set; } // Тип содержимого файла (например, image/jpeg, application/pdf)
        public byte[]? Data { get; set; } // Байтовое представление файла
        public DateTime UploadDate { get; set; } // Дата загрузки файла
        public int LibraryId { get; set; }
    }
}