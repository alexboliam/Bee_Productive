using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class BeeHive
    {
        public Guid Id { get; set; }
        public double HiveSize { get; set; }
        
        [Required]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
