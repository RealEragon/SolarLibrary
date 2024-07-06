using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.User;
using api.Models;

namespace api.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto{
                Id = userModel.Id,
                Nickname = userModel.Nickname,
                Email = userModel.Email
            };
        }

        public static User ToUserFromCreateDTO(this CreateUserRequestDto userDto)
        {
            return new User
            {
                Nickname = userDto.Nickname,
                Email = userDto.Email,
                Password = userDto.Password
            };
        }
    }
}