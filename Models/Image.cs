using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBProject.Models
{
    public class Image
    {
        public long ImageId { get; set; }
        public string Path { get; set; }
        public int JournalistId { get; set; }
    }
}
