using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DBProject.Models;

namespace DBProject.Data
{
    public class EditorContext : DbContext
    {
        public EditorContext (DbContextOptions<EditorContext> options)
            : base(options)
        {
        }

        public DbSet<DBProject.Models.Editor> Editor { get; set; }
    }
}
