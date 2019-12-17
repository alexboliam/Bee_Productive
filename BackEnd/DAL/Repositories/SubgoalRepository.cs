using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    class SubgoalRepository:RepositoryBase<Subgoal>,ISubgoalRepository
    {
        public SubgoalRepository(BeeContext beeContext): base(beeContext)
        {

        }
    }
}
