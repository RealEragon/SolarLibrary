using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Document;
using api.Models;

namespace api.Mappers
{
    public static class DocumentMappers
    {
        public static Document ToDocumentFromCreateDTO(this CreateDocumentRequestDto documentDto)
        {
            return new Document
            {
                Title = documentDto.Title,
                Description = documentDto.Description,
                ContentType = documentDto.ContentType,
                Data = documentDto.Data,
                UploadDate = documentDto.UploadDate,
                LibraryId = documentDto.LibraryId
            };
        }
    }
}