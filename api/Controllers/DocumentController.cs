using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Document;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/document")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public DocumentController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var document = _context.Documents.Find(id);

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        [HttpGet("library/{libraryId}")]
        public IActionResult GetByLibraryId([FromRoute] int libraryId)
        {
            var documents = _context.Documents.Where(l => l.LibraryId == libraryId).ToList();
            
            return Ok(documents);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateDocumentRequestDto documentDto)
        {
            var documentModel = documentDto.ToDocumentFromCreateDTO();
            _context.Documents.Add(documentModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = documentModel.Id }, documentModel);
        }
    }
}