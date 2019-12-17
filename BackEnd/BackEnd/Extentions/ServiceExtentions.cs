using AutoMapper;
using DAL.Interfaces;
using DAL.UnitOfWork_;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BackEnd.Extentions
{
    public static class ServiceExtensions
    {
        public static void ConfigureUnitOfWork(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config["dbConnection:connectionString"];
            services.AddScoped<IUnitOfWork, UnitOfWork>(ServiceProvider =>
            {
                return new UnitOfWork(connectionString);
            });

        }
        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
        }
        public static void ConfigureBLLServices(this IServiceCollection services)
        {
            //services.AddScoped<IStudentsService, StudentsService>();
            //services.AddScoped<IBooksService, BooksService>();
            //services.AddScoped<ILibraryCardsService, LibraryCardsService>();
            //services.AddScoped<IAuthorsService, AuthorsService>();
        }

        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }
        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options =>
            {

            });
        }

    }
}
