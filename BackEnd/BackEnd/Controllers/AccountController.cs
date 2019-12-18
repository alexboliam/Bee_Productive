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
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IMapper mapper;
        IUserService userService;

        public AccountController(IUserService userService, IMapper mapper)
        {
            this.userService = userService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Register user. Returns user ID for instant log in. Model should NOT include user Id, info Id, bee hive and list of goals.
        /// </summary>
        /// <param name="user">Model **must** include following fields: [ userLogin, userPassword, info { email, userName, surname, patronimic, country, city, gender, dateBirth, phoneNumber} ]. Model should **NOT** include userId, info.Id, beeHive and goals.</param>
        /// <returns></returns>
        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] UserPL user)
        {
            if(!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                var newUser = mapper.Map<UserDto>(user);
                var registeredId = userService.RegisterUser(newUser);
                if(registeredId != null)
                {
                    return Ok((Guid)registeredId);
                }
                else
                {
                    return StatusCode(409, "Unable to register new user. User with this login already exists.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }

        }

        /// <summary>
        /// Log In for current session. Returns user ID.
        /// </summary>
        /// <param name="loginForm">Model shown in SWAGGER example.</param>
        /// <returns></returns>
        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginForm loginForm)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "Model is not valid");
            }

            try
            {
                
                var logId = userService.Login(loginForm.Login, loginForm.Password);
                if (logId != null)
                {
                    return Ok((Guid)logId);
                }
                else
                {
                    return StatusCode(404, "Unable to log in. User with this login or password is not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Exception message: " + ex);
            }

        }

    }
}