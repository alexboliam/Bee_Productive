using System;

namespace BLL.Dtos
{
    public class CoachDto
    {
        public Guid CoachId { get; set; }
        public string CoachLogin { get; set; }
        public string CoachPassword { get; set; }

        public virtual CoachInfoDto Info { get; set; }
        public virtual GoalDto Goal { get; set; }
    }
}
