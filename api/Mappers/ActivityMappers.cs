using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using api.Dtos.Activity;
using api.Models;

namespace api.Mappers
{
    public static class ActivityMappers
    {
         public static Activity ToActivityFromCreateDTO(this CreateActivityRequestDto activityDto)
        {
            return new Activity
            {
                Name = activityDto.Name,
                UserId = activityDto.UserId,
                LibraryId = activityDto.LibraryId
            };
        }
    }
}