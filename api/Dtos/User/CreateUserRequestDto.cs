using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.User
{
    public class CreateUserRequestDto
    {
        public string? Nickname { get; set; }
        public string? Email { get; set; } = string.Empty;
        public string? Password { get; set; }
    }
}