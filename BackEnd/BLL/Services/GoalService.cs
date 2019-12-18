using AutoMapper;
using BLL.Dtos;
using BLL.Interfaces;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.Services
{
    public class GoalService : IGoalService
    {
        IMapper mapper;
        IUnitOfWork unit;
        public GoalService(IMapper mapper, IUnitOfWork unit)
        {
            this.mapper = mapper;
            this.unit = unit;
        }

        #region Goals stuff
        public IEnumerable<GoalDto> GetAllGoalsByUserId(Guid userId)
        {
            var goals = unit.Goals.FindByCondition(g => g.UserId.Equals(userId)).ToList();
            if(goals.Count() > 0)
            {
                return mapper.Map<IEnumerable<GoalDto>>(goals);
            }
            else
            {
                return null;
            }
        }
        public GoalDto GetGoalById(Guid goalId)
        {
            var goals = unit.Goals.FindByCondition(g => g.GoalId.Equals(goalId)).ToList();
            if (goals.Count() > 0)
            {
                return mapper.Map<GoalDto>(goals.FirstOrDefault());
            }
            else
            {
                return null;
            }
        }
        public bool CreateGoal(GoalDto goal)
        {
            var existUser = unit.Users.FindByCondition(x => x.UserId.Equals(goal.UserId)).Count();
            if (existUser == 0)
            {
                return false;
            }

            var newGoal = mapper.Map<DAL.Models.Goal>(goal);
            newGoal.GoalId = Guid.NewGuid();
            newGoal.User = unit.Users.FindByCondition(u => u.UserId.Equals(newGoal.UserId)).FirstOrDefault();
            newGoal.Coach = unit.Coaches.FindByCondition(c => c.CoachId.Equals(newGoal.CoachId)).FirstOrDefault();

            unit.Goals.Create(newGoal);
            unit.Save();
            return true;
        }
        public bool UpdateGoal(GoalDto goal)
        {
            var existGoal = unit.Goals.FindByCondition(x => x.GoalId.Equals(goal.GoalId)).Count();
            if (existGoal == 0)
            {
                return false;
            }

            var newGoal = mapper.Map<DAL.Models.Goal>(goal);
            newGoal.User = unit.Users.FindByCondition(u => u.UserId.Equals(newGoal.UserId)).FirstOrDefault();
            newGoal.Coach = unit.Coaches.FindByCondition(c => c.CoachId.Equals(newGoal.CoachId)).FirstOrDefault();
            newGoal.Subgoals = unit.Subgoals.FindByCondition(s => s.GoalId.Equals(newGoal.GoalId)).ToList();

            unit.Goals.Update(newGoal);
            unit.Save();
            return true;
        }
        public bool DeleteGoal(GoalDto goal)
        {
            var existGoal = unit.Goals.FindByCondition(x => x.GoalId.Equals(goal.GoalId)).Count();
            if (existGoal == 0)
            {
                return false;
            }

            var delGoal = mapper.Map<DAL.Models.Goal>(goal);
            delGoal.User = unit.Users.FindByCondition(u => u.UserId.Equals(delGoal.UserId)).FirstOrDefault();
            delGoal.Coach = unit.Coaches.FindByCondition(c => c.CoachId.Equals(delGoal.CoachId)).FirstOrDefault();
            delGoal.Subgoals = unit.Subgoals.FindByCondition(s => s.GoalId.Equals(delGoal.GoalId)).ToList();

            unit.Goals.Delete(delGoal);
            unit.Save();
            return true;
        } 
        #endregion

        #region Subgoals stuff
        public SubgoalDto GetSubgoalById(Guid subgoalId)
        {
            var subgoals = unit.Subgoals.FindByCondition(g => g.SubgoalId.Equals(subgoalId)).ToList();
            if (subgoals.Count() > 0)
            {
                return mapper.Map<SubgoalDto>( subgoals.FirstOrDefault() );
            }
            else
            {
                return null;
            }
        }
        public IEnumerable<SubgoalDto> GetAllSubgoalsByGoalId(Guid goalId)
        {
            var subgoals = unit.Subgoals.FindByCondition(g => g.GoalId.Equals(goalId)).ToList();
            if (subgoals.Count() > 0)
            {
                return mapper.Map<IEnumerable<SubgoalDto>>(subgoals);
            }
            else
            {
                return null;
            }
        }
        public bool CreateSubgoal(SubgoalDto subgoal)
        {
            var existGoal = unit.Goals.FindByCondition(x => x.GoalId.Equals(subgoal.GoalId)).Count();
            if (existGoal == 0)
            {
                return false;
            }

            var newSubgoal = mapper.Map<DAL.Models.Subgoal>(subgoal);
            newSubgoal.GoalId = Guid.NewGuid();
            newSubgoal.Goal = unit.Goals.FindByCondition(g => g.GoalId.Equals(newSubgoal.GoalId)).FirstOrDefault();

            unit.Subgoals.Create(newSubgoal);
            unit.Save();
            return true;
        }
        public bool UpdateSubgoal(SubgoalDto subgoal)
        {
            var existSubgoal = unit.Subgoals.FindByCondition(x => x.SubgoalId.Equals(subgoal.SubgoalId)).Count();
            if (existSubgoal == 0)
            {
                return false;
            }

            var newSubgoal = mapper.Map<DAL.Models.Subgoal>(subgoal);
            newSubgoal.Goal = unit.Goals.FindByCondition(g => g.GoalId.Equals(newSubgoal.GoalId)).FirstOrDefault();

            unit.Subgoals.Update(newSubgoal);
            unit.Save();
            return true;
        }
        public bool DeleteSubgoal(SubgoalDto subgoal)
        {
            var existSubgoal = unit.Subgoals.FindByCondition(x => x.SubgoalId.Equals(subgoal.SubgoalId)).Count();
            if (existSubgoal == 0)
            {
                return false;
            }

            var delSubgoal = mapper.Map<DAL.Models.Subgoal>(subgoal);
            delSubgoal.Goal = unit.Goals.FindByCondition(g => g.GoalId.Equals(delSubgoal.GoalId)).FirstOrDefault();

            unit.Subgoals.Delete(delSubgoal);
            unit.Save();
            return true;
        } 
        #endregion

    }
}
