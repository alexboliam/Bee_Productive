using System;

namespace BLL.Dtos
{
    public class SubgoalDto
    {
        public Guid SubgoalId { get; set; }
        public string SubgoalName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool SubgoalStatus { get; set; }

        public Guid GoalId { get; set; }
        public virtual GoalDto Goal { get; set; }

    }
}
