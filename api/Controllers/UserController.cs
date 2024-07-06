using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.User;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public UserController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.User.ToList()
             .Select(s => s.ToUserDto());
            
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var user = _context.User.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.ToUserDto());
        }
        [HttpGet("login")]
        public IActionResult Login([FromQuery] string email, [FromQuery] string password)
        {
            var user = _context.User.FirstOrDefault(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpPost]
        public IActionResult Create([FromBody] CreateUserRequestDto userDto)
        {
            var existingUser = _context.User.FirstOrDefault(u => u.Email == userDto.Email);
            if (existingUser != null)
            {
                return Conflict("User with the same email or username already exists");
            }

            var userModel = userDto.ToUserFromCreateDTO();
            _context.User.Add(userModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = userModel.Id }, userModel.ToUserDto());
        }
    }
}