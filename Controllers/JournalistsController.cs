using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DBProject.Data;
using DBProject.Models;

namespace DBProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalistsController : ControllerBase
    {
        private readonly JournalistContext _context;

        public JournalistsController(JournalistContext context)
        {
            _context = context;
        }

        // GET: api/Journalists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Journalist>>> GetJournalists()
        {
            return await _context.Journalists.ToListAsync();
        }

        // GET: api/Journalists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Journalist>> GetJournalist(int id)
        {
            var journalist = await _context.Journalists.FindAsync(id);

            if (journalist == null)
            {
                return NotFound();
            }

            return journalist;
        }

        // PUT: api/Journalists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJournalist(int id, Journalist journalist)
        {
            if (id != journalist.JournalistId)
            {
                return BadRequest();
            }

            _context.Entry(journalist).State = EntityState.Modified;

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

        // POST: api/Journalists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Journalist>> PostJournalist(Journalist journalist)
        {
            _context.Journalists.Add(journalist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJournalist", new { id = journalist.JournalistId }, journalist);
        }

        // DELETE: api/Journalists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Journalist>> DeleteJournalist(int id)
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

        private bool JournalistExists(int id)
        {
            return _context.Journalists.Any(e => e.JournalistId == id);
        }
    }
}
