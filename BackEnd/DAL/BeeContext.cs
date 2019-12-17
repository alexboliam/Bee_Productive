using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class BeeContext:DbContext
    {
        private string connection;
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<CoachInfo> CoachInfos { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Subgoal> Subgoals { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserInfo> UserInfos { get; set; }
        public DbSet<BeeHive> BeeHives { get; set; }

        public BeeContext(string connection)
        {
            this.connection = connection;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies()
                          .EnableSensitiveDataLogging()
                          .UseSqlServer(connection);
        }
    }
}
/*"Server=.\\SQLEXPRESS;Database=StudentsLibrary;Trusted_Connection=True;"*/
