using DAL.Interfaces;
using DAL.Repositories;

namespace DAL.UnitOfWork_
{
    public class UnitOfWork : IUnitOfWork
    {
        private BeeContext beeContext;
        private IBeeHiveRepository beeHiveRepository;
        private ICoachInfoRepository coachInfoRepository;
        private ICoachRepository coachRepository;
        private IGoalRepository goalRepository;
        private ISubgoalRepository subgoalRepository;
        private IUserInfoRepository userInfoRepository;
        private IUserRepository userRepository;

        public UnitOfWork(string connection)
        {
            this.beeContext = new BeeContext(connection);
        }
        public void Save()
        {
            this.beeContext.SaveChanges();
        }

        public IBeeHiveRepository BeeHives
        {
            get
            {
                if (beeHiveRepository == null)
                {
                    beeHiveRepository = new BeeHiveRepository(beeContext);
                }
                return beeHiveRepository;
            }
        }
        public ICoachInfoRepository CoachInfos
        {
            get
            {
                if (coachInfoRepository == null)
                {
                    coachInfoRepository = new CoachInfoRepository(beeContext);
                }
                return coachInfoRepository;
            }
        }
        public ICoachRepository Coaches
        {
            get
            {
                if (coachRepository == null)
                {
                    coachRepository = new CoachRepository(beeContext);
                }
                return coachRepository;
            }
        }
        public IGoalRepository Goals
        {
            get
            {
                if (goalRepository == null)
                {
                    goalRepository = new GoalRepository(beeContext);
                }
                return goalRepository;
            }
        }
        public ISubgoalRepository Subgoals
        {
            get
            {
                if (subgoalRepository == null)
                {
                    subgoalRepository = new SubgoalRepository(beeContext);
                }
                return subgoalRepository;
            }
        }

        public IUserInfoRepository UserInfos
        {
            get
            {
                if (userInfoRepository == null)
                {
                    userInfoRepository = new UserInfoRepository(beeContext);
                }
                return userInfoRepository;
            }
        }
        public IUserRepository Users
        {
            get
            {
                if (userRepository == null)
                {
                    userRepository = new UserRepository(beeContext);
                }

                return userRepository;
            }
        }



    }
}
