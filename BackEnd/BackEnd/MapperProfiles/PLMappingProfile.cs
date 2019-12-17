using AutoMapper;
using BackEnd.Models;
using BLL.Dtos;

namespace PL.Mappers
{
    public class PLMappingProfile : Profile
    {
        public PLMappingProfile()
        {
            CreateMap<BeeHivePL, BeeHiveDto>().ReverseMap();
            CreateMap<CoachPL, CoachDto>().ReverseMap();
            CreateMap<CoachInfoPL, CoachInfoDto>().ReverseMap();
            CreateMap<GoalPL, GoalDto>().ReverseMap();
            CreateMap<SubgoalPL, SubgoalDto>().ReverseMap();
            CreateMap<UserPL, UserDto>().ReverseMap();
            CreateMap<UserInfoPL, UserInfoDto>().ReverseMap();
        }
    }
}
