using BLL.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface ICoachService
    {
        IEnumerable<CoachDto> GetAllCoaches();
        CoachDto GetCoachByLogin(string userLogin);
        CoachInfoDto GetCoachInfoByCoachId(Guid userId);

        bool UpdateCoach(CoachDto user);
        bool DeleteCoach(CoachDto user);
        bool UpdateCoachInfo(CoachInfoDto info);
        bool DeleteCoachInfo(CoachInfoDto info);
    }
}
