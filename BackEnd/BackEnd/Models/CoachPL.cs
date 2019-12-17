using System;

namespace BackEnd.Models
{
    public class CoachPL
    {
        public Guid CoachId { get; set; }
        public string CoachLogin { get; set; }
        public string CoachPassword { get; set; }

        public virtual CoachInfoPL Info { get; set; }
        public virtual GoalPL Goal { get; set; }
    }
}
