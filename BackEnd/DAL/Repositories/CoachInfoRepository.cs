using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    class CoachInfoRepository: RepositoryBase<CoachInfo>,ICoachInfoRepository
    {
        public CoachInfoRepository(BeeContext beeContext): base(beeContext)
        {

        }
    }
}
