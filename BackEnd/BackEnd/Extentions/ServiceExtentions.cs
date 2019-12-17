using AutoMapper;
using BLL.Interfaces;
using BLL.Services;
using DAL.Interfaces;
using DAL.UnitOfWork_;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;

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
        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { 
                    Title = "Bee Productive API", 
                    Version = "v1",
                    Description = "Web application designed to create, store, edit, and process user goal information;" +
                    " search and store information about coaches; creating a schedule for meeting goals.",
                    Contact = new OpenApiContact
                    {
                        Name = "Bolshoi Oleksandr",
                        Email = "alexboliam@gmail.com",
                        Url = new Uri("https://t.me/boliam")
                    }
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

        }
        public static void ConfigureBLLServices(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
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
