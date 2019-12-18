using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BackEnd.Models;
using BLL.Dtos;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/coaches")]
    [ApiController]
    public class CoachesController : ControllerBase
    {
        IMapper mapper;
        ICoachService coachService;
        public CoachesController(ICoachService coachService, IMapper mapper)
        {
            this.coachService = coachService;
            this.mapper = mapper;
        }

        #region Coach stuff
        /// <summary>
        /// Get collection of all registered coaches.
        /// </summary>
        /// <returns></returns>
        [HttpGet()]
        public IActionResult GetAllCoaches()
        {
            try
            {
                var coaches = coachService.GetAllCoaches();
                return Ok(mapper.Map<IEnumerable<CoachPL>>(coaches.ToList()));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Get one coach by it's ID. Recommend use to get info about specified coach.
        /// </summary>
        /// <param name="coachLogin"></param>
        /// <returns></returns>
        [HttpGet("{coachLogin}")]
        public IActionResult GetCoachByLogin(string coachLogin)
        {
            try
            {
                var coach = coachService.GetCoachByLogin(coachLogin);
                if (coach != null)
                {
                    return Ok(mapper.Map<CoachPL>(coach));
                }
                else
                {
                    return StatusCode(404, "Coach with this login was not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Update coach's fields. Json model must contain the same ID as updatable coach.
        /// </summary>
        /// <param name="coach">Coach model. Must contain the same ID as updatable coach.</param>
        /// <returns></returns>
        [HttpPut()]
        public IActionResult UpdateCoach([FromBody] CoachPL coach)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newCoach = mapper.Map<CoachDto>(coach);

                var updated = coachService.UpdateCoach(newCoach);

                if (updated == true)
                {
                    return StatusCode(204, "Coach was updated.");
                }
                else
                {
                    return StatusCode(404, "Unable to update coach. Coach with specified ID was not not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Delete specified coach. Json model must contain the same ID as deletable coach.
        /// </summary>
        /// <param name="coach">Coach model. Must contain the same ID as deletable coach.</param>
        /// <returns></returns>
        [HttpDelete()]
        public IActionResult DeleteCoach([FromBody] CoachPL coach)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var delCoach = mapper.Map<CoachDto>(coach);

                var deleted = coachService.UpdateCoach(delCoach);

                if (deleted == true)
                {
                    return StatusCode(204, "Coach was deleted.");
                }
                else
                {
                    return StatusCode(404, "Unable to delete coach. Coach with specified ID was not not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }
        #endregion

        #region Coach Info stuff
        /// <summary>
        /// Get information about specified coach. ID of coach must be specified in header.
        /// </summary>
        /// <param name="coachId">CoachId - ID of coach to get information</param>
        /// <returns></returns>
        [HttpGet("info/{coachId}")]
        public IActionResult GetCoachInfoByCoachId(Guid coachId)
        {
            try
            {
                var info = coachService.GetCoachInfoByCoachId(coachId);
                return Ok(mapper.Map<CoachInfoPL>(info));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Update specified coach info. ID and Coach's ID must be specified.
        /// </summary>
        /// <param name="info">Model of coach's information. ID and Coach's ID must be specified.</param>
        /// <returns></returns>
        [HttpPut("info")]
        public IActionResult UpdateCoachInfo([FromBody] CoachInfoPL info)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newInfo = mapper.Map<CoachInfoDto>(info);

                var updated = coachService.UpdateCoachInfo(newInfo);

                if (updated == true)
                {
                    return StatusCode(204, "Coach info was updated.");
                }
                else
                {
                    return StatusCode(404, "Unable to update coach info. Coach info with specified ID was not not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Delete specified coach info. ID and Coach's ID must be specified.
        /// </summary>
        /// <param name="info">Model of coach's information. ID and Coach's ID must be specified.</param>
        /// <returns></returns>
        [HttpDelete("info")]
        public IActionResult DeleteCoachInfo([FromBody] CoachInfoPL info)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var delInfo = mapper.Map<CoachInfoDto>(info);

                var deleted = coachService.DeleteCoachInfo(delInfo);

                if (deleted == true)
                {
                    return StatusCode(204, "Coach info was deleted.");
                }
                else
                {
                    return StatusCode(404, "Unable to delete coach info. Coach info with specified ID was not not found.");
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