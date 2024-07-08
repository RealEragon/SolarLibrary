using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Library
{
    public class CreateLibraryRequestDto
    {
        public DateTime CreatedDate { get; set; }
        public string? Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsPublic { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
    }
}