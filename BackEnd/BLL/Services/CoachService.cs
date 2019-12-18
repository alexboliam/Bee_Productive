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
    public class CoachService : ICoachService
    {
        private IUnitOfWork unit;
        private IMapper mapper;

        public CoachService(IUnitOfWork unit, IMapper mapper)
        {
            this.unit = unit;
            this.mapper = mapper;
        }

        public IEnumerable<CoachDto> GetAllCoaches()
        {
            var coaches = unit.Coaches.FindAll();
            return mapper.Map<IEnumerable<CoachDto>>(coaches);
        }

        public CoachDto GetCoachByLogin(string coachLogin)
        {
            var coach = unit.Coaches.FindByCondition(x => x.CoachLogin.Equals(coachLogin)).FirstOrDefault();
            return mapper.Map<CoachDto>(coach);
        }

        public CoachInfoDto GetCoachInfoByCoachId(Guid coachId)
        {
            var coachInfo = unit.CoachInfos.FindByCondition(x => x.CoachId.Equals(coachId)).FirstOrDefault();
            return mapper.Map<CoachInfoDto>(coachInfo);
        }

        public bool UpdateCoach(CoachDto coach)
        {
            var exist = unit.Coaches.FindByCondition(x => x.CoachId.Equals(coach.CoachId)).Count();
            if (exist == 0)
            {
                return false;
            }

            var newCoach = mapper.Map<DAL.Models.Coach>(coach);
            newCoach.Info = unit.CoachInfos.FindByCondition(x => x.CoachId.Equals(newCoach.CoachId)).FirstOrDefault();
            newCoach.Goal = unit.Goals.FindByCondition(x => x.GoalId.Equals(coach.Goal.GoalId)).FirstOrDefault();

            unit.Coaches.Update(newCoach);
            unit.Save();
            return true;
        }
        public bool DeleteCoach(CoachDto coach)
        {
            var exist = unit.Coaches.FindByCondition(x => x.CoachId.Equals(coach.CoachId)).Count();
            if (exist == 0)
            {
                return false;
            }

            var deletedCoach = mapper.Map<DAL.Models.Coach>(coach);
            deletedCoach.Info = unit.CoachInfos.FindByCondition(x => x.CoachId.Equals(deletedCoach.CoachId)).FirstOrDefault();
            deletedCoach.Goal = unit.Goals.FindByCondition(x => x.GoalId.Equals(coach.Goal.GoalId)).FirstOrDefault();

            unit.Coaches.Delete(deletedCoach);
            unit.Save();
            return true;
        }

        public bool UpdateCoachInfo(CoachInfoDto info)
        {
            var exist = unit.CoachInfos.FindByCondition(x => x.CoachId.Equals(info.CoachId)).Count();
            if (exist == 0)
            {
                return false;
            }

            var newInfo = mapper.Map<DAL.Models.CoachInfo>(info);
            newInfo.Coach = unit.Coaches.FindByCondition(x => x.CoachId.Equals(info.CoachId)).FirstOrDefault();

            unit.CoachInfos.Update(newInfo);
            unit.Save();
            return true;
        }
        public bool DeleteCoachInfo(CoachInfoDto info)
        {
            var exist = unit.CoachInfos.FindByCondition(x => x.CoachId.Equals(info.CoachId)).Count();
            if (exist == 0)
            {
                return false;
            }

            var deletedInfo = mapper.Map<DAL.Models.CoachInfo>(info);
            deletedInfo.Coach = unit.Coaches.FindByCondition(x => x.CoachId.Equals(info.CoachId)).FirstOrDefault();

            unit.CoachInfos.Delete(deletedInfo);
            unit.Save();
            return true;
        }
    }
}
