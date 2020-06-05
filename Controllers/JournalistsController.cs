using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DBProject.Data;
using DBProject.Models;
using System.Reflection;

namespace DBProject.Controllers
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JournalistsController : ControllerBase
    {
        private readonly JournalistContext _context;
        private readonly EditorContext _editorContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JournalistsController(JournalistContext context,EditorContext editorContext, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _editorContext = editorContext;
            _httpContextAccessor = httpContextAccessor;
        }
        [HttpGet("/api/profile")]
        public ActionResult<object> GetProfile()
        {
            var header = _httpContextAccessor.HttpContext.Request.Headers;
            var uid = long.Parse(header["uid"]);
            var isEditor = bool.Parse(header["iseditor"]);

            if (isEditor)
            {
                var u = (from e in _editorContext.Editor where e.EditorId == uid select e).FirstOrDefault();
                return u;
            }
            else
            {
                var u = (from j in _context.Journalists where j.JournalistId == uid select j).FirstOrDefault();
                return u;
            }
        }

        public class SubmitProfile
        {
            public string Age { get; set; }
            public GenderEnum Gender { get; set; }
            public string Phonenumber { get; set; }
            public string EmailAddress { get; set; }
            public string Address { get; set; }
            public string Intro { get; set; }

        }
        [HttpPut("/api/profile")]
        public async Task<ActionResult<object>> ModefiyProfile(SubmitProfile prof)
        {
            var header = _httpContextAccessor.HttpContext.Request.Headers;
            var uid = long.Parse(header["uid"]);
            var isEditor = bool.Parse(header["iseditor"]);

            if (isEditor)
            {
                var u = (from e in _editorContext.Editor where e.EditorId == uid select e).FirstOrDefault();
                if (u == null)
                    return NotFound();
                

                u.Intro = prof.Intro ?? u.Intro;
                u.Age = prof.Age ?? u.Age;
                u.Gender = prof.Gender;
                u.Phonenumber = prof.Phonenumber ?? u.Phonenumber;
                u.EmailAddress = prof.EmailAddress ?? u.EmailAddress;
                u.Address = prof.Address ?? u.Address;
                _editorContext.Entry(u).State = EntityState.Modified;
                await _editorContext.SaveChangesAsync();

                return CreatedAtAction("GetProfile",null);
            }
            else
            {
                var u = (from j in _context.Journalists where j.JournalistId == uid select j).FirstOrDefault();
                if (u == null)
                    return NotFound();

                u.Intro = prof.Intro ?? u.Intro;
                u.Age = prof.Age ?? u.Age;
                u.Gender = prof.Gender;
                u.Phonenumber = prof.Phonenumber ?? u.Phonenumber;
                u.EmailAddress = prof.EmailAddress ?? u.EmailAddress;
                u.Address = prof.Address ?? u.Address;
                _context.Entry(u).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProfile", null);
            }
        }
        public class SubmitPwd
        {
            public string Password { get; set; }
            public string NewPass { get; set; }
        }
        [HttpPut("/api/passwd")]
        public async Task<ActionResult<object>> ChangePassword(SubmitPwd pwd)
        {
            var header = _httpContextAccessor.HttpContext.Request.Headers;
            var uid = long.Parse(header["uid"]);
            var isEditor = bool.Parse(header["iseditor"]);

            if (isEditor)
            {
                var u = (from e in _editorContext.Editor where e.EditorId == uid && e.Password == pwd.Password select e).FirstOrDefault();
                if (u == null)
                    return NotFound();

                u.Password = pwd.NewPass;
                _editorContext.Entry(u).State = EntityState.Modified;
                await _editorContext.SaveChangesAsync();

                return NoContent();
            }
            else
            {
                var u = (from j in _context.Journalists where j.JournalistId == uid && j.Password == pwd.Password select j).FirstOrDefault();
                if (u == null)
                    return NotFound();

                u.Password = pwd.NewPass;
                _context.Entry(u).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }
        
        
        async Task<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<Journalist>> GetAJournalist(long id)
        {
            return _context.Entry(await _context.Journalists.FindAsync(id));
        }

        // GET: api/Journalists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Journalist>>> GetJournalists()
        {
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            if (!isEditor)
                return NotFound();
            return await _context.Journalists.ToListAsync();
        }

        // GET: api/Journalists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Journalist>> GetJournalist(long id)
        {
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            if (!isEditor)
                return NotFound();

            var journalist = await _context.Journalists.FindAsync(id);

            if (journalist == null)
            {
                return NotFound();
            }

            return journalist;
        }

        public class SubmitJour
        {
            public Journalist Journalist { get; set; }
            public string Password { get; set; }
        }
        // PUT: api/Journalists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJournalist(long id, SubmitJour njournalist)
        {
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            if (!isEditor)
                return NotFound();

            var journalist = await GetAJournalist(id);
            if (journalist == null)
            {
                return BadRequest();
            }

            journalist.Entity.Password = njournalist.Password ?? journalist.Entity.Password;
            journalist.Entity.Name = njournalist.Journalist.Name ?? journalist.Entity.Name;
            journalist.Entity.Age = njournalist.Journalist.Age ?? journalist.Entity.Age;
            journalist.Entity.Gender = njournalist.Journalist.Gender;
            journalist.Entity.Phonenumber = njournalist.Journalist.Phonenumber ?? journalist.Entity.Phonenumber;
            journalist.Entity.EmailAddress = njournalist.Journalist.EmailAddress ?? journalist.Entity.EmailAddress;
            journalist.Entity.Address = njournalist.Journalist.Address ?? journalist.Entity.Address;
            journalist.Property(p => p.Password).IsModified = true;
            journalist.Property(p => p.Name).IsModified = true;
            journalist.Property(p => p.Age).IsModified = true;
            journalist.Property(p => p.Gender).IsModified = true;
            journalist.Property(p => p.Phonenumber).IsModified = true;
            journalist.Property(p => p.EmailAddress).IsModified = true;
            journalist.Property(p => p.Address).IsModified = true;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JournalistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut("ban/{id}")]
        public async Task<object> BanJournalist(long id)
        {
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            if (!isEditor)
                return NotFound();
            var journalist = await GetAJournalist(id);
            if (journalist == null)
            {
                return BadRequest();
            }

            journalist.Entity.Banished = !journalist.Entity.Banished;
            //var e = _context.Entry(journalist);
            journalist.Property(p=>p.Banished).IsModified = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JournalistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return new { banished = journalist.Entity.Banished };
        }
        // POST: api/Journalists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Journalist>> PostJournalist(SubmitJour journalist)
        {
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            if (!isEditor)
                return NotFound();

            journalist.Journalist.Password = journalist.Password;
            _context.Journalists.Add(journalist.Journalist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJournalist", new { id = journalist.Journalist.JournalistId }, journalist.Journalist);
        }

        // DELETE: api/Journalists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Journalist>> DeleteJournalist(long id)
        {
            var journalist = await _context.Journalists.FindAsync(id);
            if (journalist == null)
            {
                return NotFound();
            }

            _context.Journalists.Remove(journalist);
            await _context.SaveChangesAsync();

            return journalist;
        }

        private bool JournalistExists(long id)
        {
            return _context.Journalists.Any(e => e.JournalistId == id);
        }
    }
}
