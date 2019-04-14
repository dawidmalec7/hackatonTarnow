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



        public MySqlContext(DbContextOptions<MySqlContext> options) : base(options) { }
    }
}
