using System;
using System.Collections.Generic;

namespace BLL.Dtos
{
    public class GoalDto
    {
        public Guid GoalId { get; set; }
        public string GoalName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool GoalStatus { get; set; }
        

        public virtual List<SubgoalDto> Subgoals { get; set; }

        public Guid CoachId { get; set; }
        public virtual CoachDto Coach { get; set; }

        public Guid UserId { get; set; }
        public virtual UserDto User { get; set; }
    }
}
