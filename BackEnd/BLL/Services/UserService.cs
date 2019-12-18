using AutoMapper;
using BLL.Dtos;
using BLL.Interfaces;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private IUnitOfWork unit;
        private IMapper mapper;

        public UserService(IUnitOfWork unit, IMapper mapper)
        {
            this.unit = unit;
            this.mapper = mapper;
        }


        public IEnumerable<UserDto> GetAllUsers()
        {
            var users = unit.Users.FindAll().ToList();
            return mapper.Map<IEnumerable<UserDto>>(users);
        }

        public UserDto GetUserByLogin(string userLogin)
        {
            var user = unit.Users.FindByCondition(x => x.UserLogin.Equals(userLogin)).FirstOrDefault();
            return mapper.Map<UserDto>(user);
        }

        public UserInfoDto GetUserInfoByUserId(Guid userId)
        {
            var userInfo = unit.UserInfos.FindByCondition(x => x.UserId.Equals(userId)).FirstOrDefault();
            return mapper.Map<UserInfoDto>(userInfo);
        }

        public Guid? Login(string login, string password)
        {
            var user = unit.Users.FindByCondition(x => x.UserLogin.Equals(login) && x.UserPassword.Equals(password)).FirstOrDefault();
            if(user!=null)
            {
                return user.UserId;
            }
            else
            {
                return null;
            }
        }
        public Guid? RegisterUser(UserDto user)
        {
            // допустим, пароль уже захеширован
            // если это не так, то TODO: encrypt password
            var exist = unit.Users.FindByCondition(x => x.UserLogin.Equals(user.UserLogin)).Count();
            if (exist > 0)
            {
                return null;
            }


            user.UserId = Guid.NewGuid();

            user.Info.Id = Guid.NewGuid();
            user.Info.UserId = user.UserId;
            user.Info.User = user;

            user.BeeHive = new BeeHiveDto();
            user.BeeHive.Id = Guid.NewGuid();
            user.BeeHive.UserId = user.UserId;
            user.BeeHive.User = user;
            user.BeeHive.HiveSize = 0d;


            var newUser = mapper.Map<DAL.Models.User>(user);

            unit.Users.Create(newUser);
            unit.Save();
            return newUser.UserId;

        }


        public bool UpdateUser(UserDto user)
        {
            var exist = unit.Users.FindByCondition(x => x.UserId.Equals(user.UserId)).Count();
            if(exist == 0)
            {
                return false;
            }

            var newUser = mapper.Map<DAL.Models.User>(user);
            newUser.Info = unit.UserInfos.FindByCondition(x => x.UserId.Equals(newUser.UserId)).FirstOrDefault();
            newUser.BeeHive = unit.BeeHives.FindByCondition(x => x.UserId.Equals(newUser.UserId)).FirstOrDefault();
            newUser.Goals = unit.Goals.FindByCondition(x => x.UserId.Equals(newUser.UserId)).ToList();

            unit.Users.Update(newUser);
            unit.Save();
            return true;
        }
        public bool DeleteUser(UserDto user)
        {
            var exist = unit.Users.FindByCondition(x => x.UserId.Equals(user.UserId)).Count();
            if (exist == 0)
            {
                return false;
            }

            var deletedUser = mapper.Map<DAL.Models.User>(user);
            deletedUser.Info = unit.UserInfos.FindByCondition(x => x.UserId.Equals(deletedUser.UserId)).FirstOrDefault();
            deletedUser.BeeHive = unit.BeeHives.FindByCondition(x => x.UserId.Equals(deletedUser.UserId)).FirstOrDefault();
            deletedUser.Goals = unit.Goals.FindByCondition(x => x.UserId.Equals(deletedUser.UserId)).ToList();

            unit.Users.Delete(deletedUser);
            unit.Save();
            return true;
        }

        public bool UpdateUserInfo(UserInfoDto info)
        {
            var exist = unit.UserInfos.FindByCondition(x => x.UserId.Equals(info.UserId)).Count();
            if (exist == 0)
            {
                return false;
            }

            var newInfo = mapper.Map<DAL.Models.UserInfo>(info);
            newInfo.User = unit.Users.FindByCondition(x => x.UserId.Equals(info.UserId)).FirstOrDefault();

            unit.UserInfos.Update(newInfo);
            unit.Save();
            return true;
        }
        public bool DeleteUserInfo(UserInfoDto info)
        {
            var exist = unit.UserInfos.FindByCondition(x => x.UserId.Equals(info.UserId)).Count();
            if (exist == 0)
            {
                return false;
            }

            var deletedInfo = mapper.Map<DAL.Models.UserInfo>(info);
            deletedInfo.User = unit.Users.FindByCondition(x => x.UserId.Equals(info.UserId)).FirstOrDefault();

            unit.UserInfos.Delete(deletedInfo);
            unit.Save();
            return true;
        }
    }
}
