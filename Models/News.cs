using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DBProject.Models
{
    public class News
    {
        public int NewsId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Raw { get; set; }
        public string Abstract { get; set; }
        public string Remark { get; set; }
        public int JournalistId { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreateTime { get; set; }
        [DataType(DataType.Date)]
        public DateTime SubmitTime { get; set; }
        [DataType(DataType.Date)]
        public DateTime PublishTime { get; set; }
        public int Status { get; set; }
    }
}
