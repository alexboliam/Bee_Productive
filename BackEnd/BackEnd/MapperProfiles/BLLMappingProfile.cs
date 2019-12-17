using AutoMapper;
using DAL.Models;
using BLL.Dtos;

namespace PL.Mappers
{
    public class BLLMappingProfile : Profile
    {
        public BLLMappingProfile()
        {
            CreateMap<BeeHive, BeeHiveDto>().ReverseMap();
            CreateMap<Coach, CoachDto>().ReverseMap();
            CreateMap<CoachInfo, CoachInfoDto>().ReverseMap();
            CreateMap<Goal, GoalDto>().ReverseMap();
            CreateMap<Subgoal, SubgoalDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserInfo, UserInfoDto>().ReverseMap();
        }
    }
}
