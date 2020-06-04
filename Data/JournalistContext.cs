using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBProject.Models;
using Microsoft.EntityFrameworkCore;

namespace DBProject.Data
{
    public class JournalistContext:DbContext
    {
        public JournalistContext(DbContextOptions<JournalistContext> options)
           : base(options)
        {
        }

        public DbSet<Journalist> Journalists { get; set; }
    }
}
