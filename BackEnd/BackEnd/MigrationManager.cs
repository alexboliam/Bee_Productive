using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace BackEnd
{
    public static class MigrationManager
    {
        public static IHost MigrateDatabase(this IHost webHost)
        {
            using (var scope = webHost.Services.CreateScope())
            {
                using (var appContext = scope.ServiceProvider.GetRequiredService<BeeContext>())
                {
                    try
                    {
                        appContext.Database.Migrate();
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }

            return webHost;
        }
    }
}