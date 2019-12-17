using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public class GoalPL
    {
        public Guid GoalId { get; set; }
        public string GoalName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool GoalStatus { get; set; }
        

        public virtual List<SubgoalPL> Subgoals { get; set; }

        public Guid CoachId { get; set; }
        public virtual CoachPL Coach { get; set; }

        public Guid UserId { get; set; }
        public virtual UserPL User { get; set; }
    }
}
