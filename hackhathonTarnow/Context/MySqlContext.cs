using hackhathonTarnow.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hackhathonTarnow.Context
{
    public class MySqlContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Parking> Parkings { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Space> Spaces { get; set; }
        public MySqlContext(DbContextOptions<MySqlContext> options) : base(options) { }
    }
}
