using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DBProject.Models;

namespace DBProject.Data
{
    public class ImageContext : DbContext
    {
        public ImageContext (DbContextOptions<ImageContext> options)
            : base(options)
        {
        }

        public DbSet<DBProject.Models.Image> Image { get; set; }
    }
}
