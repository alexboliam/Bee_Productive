using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Subgoal
    {
        public Guid SubgoalId { get; set; }

        [Required]
        [MaxLength(255, ErrorMessage = "Invalid field length")]
        public string SubgoalName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool SubgoalStatus { get; set; }

        [Required]
        public Guid GoalId { get; set; }
        public virtual Goal Goal { get; set; }

    }
}
