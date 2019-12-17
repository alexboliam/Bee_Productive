using System;

namespace BackEnd.Models
{
    public class SubgoalPL
    {
        public Guid SubgoalId { get; set; }
        public string SubgoalName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool SubgoalStatus { get; set; }

        public Guid GoalId { get; set; }
        public virtual GoalPL Goal { get; set; }

    }
}
