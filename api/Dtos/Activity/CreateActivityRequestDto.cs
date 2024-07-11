using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Activity
{
    public class CreateActivityRequestDto
    {
        public string? Name { get; set; }
        public int UserId { get; set; }
        public int LibraryId { get; set; }
    }
}