using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    class BeeHiveRepository: RepositoryBase<BeeHive>, IBeeHiveRepository
    {
        public BeeHiveRepository(BeeContext BeeContext) : base(BeeContext)
        {
        }
    }
}
