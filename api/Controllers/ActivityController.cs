using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;
using api.Dtos.Activity;

namespace api.Controllers
{
    [Route("api/activity")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public ActivityController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var activity = _context.Activities.Find(id);

            if (activity == null)
            {
                return NotFound();
            }

            return Ok(activity);
        }

        [HttpGet("library/{libraryId}")]
        public IActionResult GetByLibraryId([FromRoute] int libraryId)
        {
            var activities = _context.Activities.Where(l => l.LibraryId == libraryId).ToList();
            
            return Ok(activities);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateActivityRequestDto activityDto)
        {
            var activityModel = activityDto.ToActivityFromCreateDTO();
            _context.Activities.Add(activityModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = activityModel.Id }, activityModel);
        }
    }
}