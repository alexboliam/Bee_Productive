
namespace DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IBeeHiveRepository BeeHives { get; }
        ICoachInfoRepository CoachInfos { get; }
        ICoachRepository Coaches { get; }
        IGoalRepository Goals { get; }
        ISubgoalRepository Subgoals { get; }
        IUserRepository Users { get; }
        IUserInfoRepository UserInfos { get; }
        void Save();
    }
}
