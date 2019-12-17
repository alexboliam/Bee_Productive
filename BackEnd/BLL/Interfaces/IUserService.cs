using BLL.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        Guid? RegisterUser(UserDto user);
        Guid? Login(string login, string password);

        IEnumerable<UserDto> GetAllUsers();
        UserDto GetUserByLogin(string userLogin);
        UserInfoDto GetUserInfoByUserId(Guid userId);

        bool UpdateUser(UserDto user);
        bool DeleteUser(UserDto user);
        bool UpdateUserInfo(UserInfoDto info);
        bool DeleteUserInfo(UserInfoDto info);

    }
}
