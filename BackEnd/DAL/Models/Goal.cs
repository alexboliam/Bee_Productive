using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class Goal
    {
        public Guid GoalId { get; set; }

        [Required]
        [MaxLength(255, ErrorMessage = "Invalid field length")]
        public string GoalName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool GoalStatus { get; set; }
        

        public virtual List<Subgoal> Subgoals { get; set; }

        [Required]
        public Guid CoachId { get; set; }
        public virtual Coach Coach { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
