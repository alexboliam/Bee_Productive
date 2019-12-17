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
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IMapper mapper;
        IUserService userService;

        public UsersController(IUserService userService, IMapper mapper)
        {
            this.userService = userService;
            this.mapper = mapper;
        }

        #region User stuff
        /// <summary>
        /// Get collection of all registered users. Recommended to use only in admin's panel.
        /// </summary>
        /// <returns></returns>
        [HttpGet()]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = userService.GetAllUsers();
                return Ok(mapper.Map<IEnumerable<UserPL>>(users));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Get one user by it's ID. Recommend use to get info about specified user.
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        [HttpGet("{userLogin}")]
        public IActionResult GetUserByLogin(string userLogin)
        {
            try
            {
                var user = userService.GetUserByLogin(userLogin);
                if (user != null)
                {
                    return Ok(mapper.Map<UserPL>(user));
                }
                else
                {
                    return StatusCode(409, "User with this login was not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Update user's fields. Json model must contain the same ID as updatable user.
        /// </summary>
        /// <param name="user">User model. Must contain the same ID as updatable user.</param>
        /// <returns></returns>
        [HttpPut()]
        public IActionResult UpdateUser([FromBody] UserPL user)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newUser = mapper.Map<UserDto>(user);

                var updated = userService.UpdateUser(newUser);

                if (updated == true)
                {
                    return StatusCode(204, "User was updated.");
                }
                else
                {
                    return StatusCode(409, "Unable to update user. User with specified ID was not not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Delete specified user. Json model must contain the same ID as deletable user.
        /// </summary>
        /// <param name="user">User model. Must contain the same ID as deletable user.</param>
        /// <returns></returns>
        [HttpDelete()]
        public IActionResult DeleteUser([FromBody] UserPL user)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var delUser = mapper.Map<UserDto>(user);

                var deleted = userService.UpdateUser(delUser);

                if (deleted == true)
                {
                    return StatusCode(204, "User was deleted.");
                }
                else
                {
                    return StatusCode(409, "Unable to delete user. User with specified ID was not not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        } 
        #endregion

        #region User Info stuff
        /// <summary>
        /// Get information about specified user. ID of user must be specified in header.
        /// </summary>
        /// <param name="userId">UserId - ID of user to get information</param>
        /// <returns></returns>
        [HttpGet("info/{userId}")]
        public IActionResult GetUserInfoByUserId(Guid userId)
        {
            try
            {
                var info = userService.GetUserInfoByUserId(userId);
                return Ok(mapper.Map<UserInfoPL>(info));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Update specified user info. ID and User's ID must be specified.
        /// </summary>
        /// <param name="info">Model of user's information. ID and User's ID must be specified.</param>
        /// <returns></returns>
        [HttpPut("info")]
        public IActionResult UpdateUserInfo([FromBody] UserInfoPL info)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newInfo = mapper.Map<UserInfoDto>(info);

                var updated = userService.UpdateUserInfo(newInfo);

                if (updated == true)
                {
                    return StatusCode(204, "User info was updated.");
                }
                else
                {
                    return StatusCode(409, "Unable to update user info. User info with specified ID was not not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }
        }

        /// <summary>
        /// Delete specified user info. ID and User's ID must be specified.
        /// </summary>
        /// <param name="info">Model of user's information. ID and User's ID must be specified.</param>
        /// <returns></returns>
        [HttpDelete("info")]
        public IActionResult DeleteUserInfo([FromBody] UserInfoPL info)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var delInfo = mapper.Map<UserInfoDto>(info);

                var deleted = userService.DeleteUserInfo(delInfo);

                if (deleted == true)
                {
                    return StatusCode(204, "User info was deleted.");
                }
                else
                {
                    return StatusCode(409, "Unable to delete user info. User info with specified ID was not not found.");
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