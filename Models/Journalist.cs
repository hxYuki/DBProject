using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBProject.Models
{
    public interface User
    {

    }
    public enum GenderEnum
    {
        Male,Female
    }
    public class Journalist
    {
        public int JournalistId { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public GenderEnum Gender { get; set; }
        public string Phonenumber { get; set; }
        public string EmailAddress { get; set; }
        public string Address { get; set; }
        public string Intro { get; set; }
        public long CertId { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public string Password { get; set; }
        public bool Banished { get; set; }
    }
}
