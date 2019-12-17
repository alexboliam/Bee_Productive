using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class User
    {
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string UserLogin { get; set; }
        public string UserPassword { get; set; }
        public virtual UserInfo Info { get; set; }
        public virtual BeeHive BeeHive { get; set; }
        public virtual List<Goal> Goals { get; set; }

    }
}
