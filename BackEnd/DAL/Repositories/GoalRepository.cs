using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    class GoalRepository:RepositoryBase<Goal>,IGoalRepository
    {
        public GoalRepository(BeeContext beeContext): base(beeContext)
        {

        }
    }
}
