using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DBProject.Data
{
    public class JournalistContext:DbContext
    {
        public JournalistContext(DbContextOptions<JournalistContext> options)
           : base(options)
        {
        }

        public DbSet<Journalist> Journalists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Journalist>()
                        .Property<long>("CertId")
                        .HasComputedColumnSql("10000 + [JournalistId]");
        }
    }
}
