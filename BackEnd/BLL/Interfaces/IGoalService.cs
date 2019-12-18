using BLL.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IGoalService
    {
        IEnumerable<GoalDto> GetAllGoalsByUserId(Guid userId);
        GoalDto GetGoalById(Guid goalId);
        bool CreateGoal(GoalDto goal);
        bool UpdateGoal(GoalDto goal);
        bool DeleteGoal(GoalDto goal);


        IEnumerable<SubgoalDto> GetAllSubgoalsByGoalId(Guid goalId);
        SubgoalDto GetSubgoalById(Guid subgoalId);
        bool CreateSubgoal(SubgoalDto subgoal);
        bool UpdateSubgoal(SubgoalDto subgoal);
        bool DeleteSubgoal(SubgoalDto subgoal);
    }
}
