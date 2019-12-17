using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public class UserPL
    {
        public Guid UserId { get; set; }
        public string UserLogin { get; set; }
        public string UserPassword { get; set; }
        public virtual UserInfoPL Info { get; set; }
        public virtual BeeHivePL BeeHive { get; set; }
        public virtual List<GoalPL> Goals { get; set; }

    }
}
