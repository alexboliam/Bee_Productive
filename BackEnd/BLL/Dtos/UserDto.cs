using System;
using System.Collections.Generic;

namespace BLL.Dtos
{
    public class UserDto
    {
        public Guid UserId { get; set; }
        public string UserLogin { get; set; }
        public string UserPassword { get; set; }
        public virtual UserInfoDto Info { get; set; }
        public virtual BeeHiveDto BeeHive { get; set; }
        public virtual List<GoalDto> Goals { get; set; }

    }
}
