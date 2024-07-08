using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Library;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/library")]
    [ApiController]

    public class LibraryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public LibraryController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var libraries = _context.Libraries.ToList();
            
            return Ok(libraries);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var library = _context.Libraries.Find(id);

            if (library == null)
            {
                return NotFound();
            }

            return Ok(library);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUserId([FromRoute] int userId)
        {
            var libraries = _context.Libraries.Where(l => l.UserId == userId).ToList();

            if (libraries.Count == 0)
            {
                return NotFound();
            }

            return Ok(libraries);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateLibraryRequestDto libraryDto)
        {
            var libraryModel = libraryDto.ToLibraryFromCreateDTO();
            _context.Libraries.Add(libraryModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = libraryModel.Id }, libraryModel);
        }
    }
}