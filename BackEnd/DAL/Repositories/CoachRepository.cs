using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    class CoachRepository:RepositoryBase<Coach>,ICoachRepository
    {
        public CoachRepository(BeeContext beeContext):base(beeContext)
        {

        }
    }
}
