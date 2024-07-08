using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Library;
using api.Models;

namespace api.Mappers
{
    public static class LibraryMappers
    {
        public static Library ToLibraryFromCreateDTO(this CreateLibraryRequestDto libraryDto)
        {
            return new Library
            {
                CreatedDate = libraryDto.CreatedDate,
                Name = libraryDto.Name,
                Description = libraryDto.Description,
                IsPublic = libraryDto.IsPublic,
                UserId = libraryDto.UserId,
                CategoryId = libraryDto.CategoryId
            };
        }
    }
}