using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    class UserInfoRepository:RepositoryBase<UserInfo>,IUserInfoRepository
    {
        public UserInfoRepository(BeeContext beeContext):base(beeContext)
        {

        }
    }
}
