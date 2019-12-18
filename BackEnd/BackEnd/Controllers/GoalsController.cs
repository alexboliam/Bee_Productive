using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BackEnd.Models;
using BLL.Dtos;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/goals")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        IMapper mapper;
        IGoalService goalService;
        public GoalsController(IGoalService goalService, IMapper mapper)
        {
            this.goalService = goalService;
            this.mapper = mapper;
        }

        #region Goals stuff
        /// <summary>
        /// Get all goals for user specified by userId.
        /// </summary>
        /// <param name="userId">UserId parameter must be defined.</param>
        /// <returns></returns>
        [HttpGet("all/{userId}")]
        public IActionResult GetAllGoalsByUserId(Guid userId)
        {
            try
            {
                var goals = goalService.GetAllGoalsByUserId(userId);
                if (goals != null)
                {
                    return Ok(mapper.Map<IEnumerable<GoalPL>>(goals.ToList()));
                }
                else
                {
                    return Ok(null);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Get goal by it's ID.
        /// </summary>
        /// <param name="goalId">GoalId parameter must be defined.</param>
        /// <returns></returns>
        [HttpGet("{goalId}")]
        public IActionResult GetGoalById(Guid goalId)
        {
            try
            {
                var goal = goalService.GetGoalById(goalId);
                if (goal != null)
                {
                    return Ok(mapper.Map<GoalPL>(goal));
                }
                else
                {
                    return StatusCode(404, $"Goal with id:[{goalId}] not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Create goal for specified goal by goalId. JSON model should have all fields filled, EXCEPT goalId and nested models.
        /// </summary>
        /// <param name="goal">Model must have all fields filled, EXCEPT goalId and nested models.</param>
        /// <returns></returns>
        [HttpPost()]
        public IActionResult CreateGoal([FromBody]GoalPL goal)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newGoal = mapper.Map<GoalDto>(goal);
                var created = goalService.CreateGoal(newGoal);
                if (created == true)
                {
                    return StatusCode(201, "Goal was created.");
                }
                else
                {
                    return StatusCode(500, "Unable to create goal.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Update goal specified by it's ID. JSON model should have all fields filled, EXCEPT nested models.
        /// </summary>
        /// <param name="goal">All fields **must** be filled, **except** nested models.</param>
        /// <returns></returns>
        [HttpPut()]
        public IActionResult UpdateGoal([FromBody]GoalPL goal)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newGoal = mapper.Map<GoalDto>(goal);
                var updated = goalService.UpdateGoal(newGoal);
                if (updated == true)
                {
                    return StatusCode(204, "Goal was updated.");
                }
                else
                {
                    return StatusCode(404, $"Unable to update goal. Goal with id:[{goal.GoalId}] is not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Delete goal specified by it's ID. JSON model should have all fields filled, EXCEPT nested models.
        /// </summary>
        /// <param name="goal">All fields **must** be filled, **except** nested models.</param>
        /// <returns></returns>
        [HttpDelete()]
        public IActionResult DeleteGoal([FromBody]GoalPL goal)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var delGoal = mapper.Map<GoalDto>(goal);
                var deleted = goalService.DeleteGoal(delGoal);
                if (deleted == true)
                {
                    return StatusCode(204, "Goal was deleted.");
                }
                else
                {
                    return StatusCode(404, $"Unable to delete goal. Goal with id:[{goal.GoalId}] is not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }
        #endregion

        #region Subgoals stuff
        /// <summary>
        /// Get all subgoals for goal specified by goalId. 
        /// </summary>
        /// <param name="goalId">GoalId parameter must be defined.</param>
        /// <returns></returns>
        [HttpGet("{goalId}/subgoals")]
        public IActionResult GetSubgoalsByGoalId(Guid goalId)
        {
            try
            {
                var subgoals = goalService.GetAllSubgoalsByGoalId(goalId);
                if (subgoals != null)
                {
                    return Ok(mapper.Map<IEnumerable<SubgoalPL>>(subgoals.ToList()));
                }
                else
                {
                    return Ok(null);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Get subgoal by it's ID.
        /// </summary>
        /// <param name="subgoalId">SubgoalId parameter must be defined.</param>
        /// <returns></returns>
        [HttpGet("subgoals/{subgoalId}")]
        public IActionResult GetSubgoalById(Guid subgoalId)
        {
            try
            {
                var subgoal = goalService.GetSubgoalById(subgoalId);
                if (subgoal != null)
                {
                    return Ok(mapper.Map<SubgoalPL>(subgoal));
                }
                else
                {
                    return StatusCode(404, $"Subgoal with id:[{subgoalId}] not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }

        }

        /// <summary>
        /// Create subgoal for specified goal by goalId. JSON model should have all fields filled, EXCEPT subgoalId and nested models.
        /// </summary>
        /// <param name="subgoal">Model must have all fields filled, EXCEPT subgoalId and nested models.</param>
        /// <returns></returns>
        [HttpPost("subgoals")]
        public IActionResult CreateSubgoal([FromBody]SubgoalPL subgoal)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newSubgoal = mapper.Map<SubgoalDto>(subgoal);
                var created = goalService.CreateSubgoal(newSubgoal);
                if (created == true)
                {
                    return StatusCode(201, "Subgoal was created.");
                }
                else
                {
                    return StatusCode(404, $"Unable to create subgoal. Goal not found or happened internal server error.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Update subgoal specified by it's ID. JSON model should have all fields filled, EXCEPT nested models.
        /// </summary>
        /// <param name="subgoal">All fields **must** be filled, **except** nested models.</param>
        /// <returns></returns>
        [HttpPut("subgoals")]
        public IActionResult UpdateSubgoal([FromBody]SubgoalPL subgoal)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newSubgoal = mapper.Map<SubgoalDto>(subgoal);
                var updated = goalService.UpdateSubgoal(newSubgoal);
                if (updated == true)
                {
                    return StatusCode(201, "Subgoal was updated.");
                }
                else
                {
                    return StatusCode(404, $"Unable to update subgoal. Goal not found or happened internal server error.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Delete subgoal specified by it's ID. JSON model should have all fields filled, EXCEPT nested models.
        /// </summary>
        /// <param name="subgoal"> All fields **must** be filled, **except** nested models.</param>
        /// <returns></returns>
        [HttpDelete("subgoals")]
        public IActionResult DeleteSubgoal([FromBody]SubgoalPL subgoal)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var delSubgoal = mapper.Map<SubgoalDto>(subgoal);
                var deleted = goalService.DeleteSubgoal(delSubgoal);
                if (deleted == true)
                {
                    return StatusCode(201, "Subgoal was deleted.");
                }
                else
                {
                    return StatusCode(404, $"Unable to delete subgoal. Goal not found or happened internal server error.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        #endregion
    }
}