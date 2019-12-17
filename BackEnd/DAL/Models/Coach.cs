using System;
using System.ComponentModel.DataAnnotations;


namespace DAL.Models
{
    public class Coach
    {
        public Guid CoachId { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string CoachLogin { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "Invalid field length")]
        public string CoachPassword { get; set; }

        public virtual CoachInfo Info { get; set; }
        public virtual Goal Goal { get; set; }
    }
}
