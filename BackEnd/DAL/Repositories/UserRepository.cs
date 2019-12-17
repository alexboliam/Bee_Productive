using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    class UserRepository:RepositoryBase<User>,IUserRepository
    {
        public UserRepository(BeeContext beeContext):base(beeContext)
        {

        }
    }
}
