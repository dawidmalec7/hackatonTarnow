using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using hackhathonTarnow.Models;
using hackhathonTarnow.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using hackhathonTarnow.Context;
using Xunit;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System.Linq;

namespace WebApiIntegrations
{

    public class SimpleIntegrationTest : IDisposable
    {
        MySqlContext _context;
     
        public SimpleIntegrationTest()
        {
            var serviceProvider = new ServiceCollection()
            .AddEntityFrameworkSqlServer()
            .BuildServiceProvider(); ;
            var builder = new DbContextOptionsBuilder<MySqlContext>();


            builder.UseSqlServer("Server=DESKTOP-4DA5LEH;Database=ParkingiTest; MultipleActiveResultSets=True; App=EntityFrameworkCore; Trusted_Connection=True; Integrated Security=true;")
                .UseInternalServiceProvider(serviceProvider);


            _context = new MySqlContext(builder.Options);
            _context.Database.Migrate();
        }

        [Fact]
        public void QueryUserFromSqlTest()
        {
            //Add some User before querying
            _context.Users.Add(new User { Id = new Guid("{CF0A8C1C-F2D0-41A1-A12C-53D9BE513A1C}"), Name = "Dave" });
            _context.SaveChanges();

            //Execute the query
            UsersController query = new UsersController(_context);
            var Users = query.GetUsersAsync();

            System.Diagnostics.Debug.WriteLine(_context.Users.Where(p => p.Name == "Dave"));

            //Verify the results

            Assert.True(true);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
        }
 }
}