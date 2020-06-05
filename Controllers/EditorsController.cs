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
    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EditorsController : ControllerBase
    {
        private readonly EditorContext _context;

        public EditorsController(EditorContext context)
        {
            _context = context;
        }

        // GET: api/Editors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Editor>>> GetEditor()
        {
            return await _context.Editor.ToListAsync();
        }

        // GET: api/Editors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Editor>> GetEditor(int id)
        {
            var editor = await _context.Editor.FindAsync(id);

            if (editor == null)
            {
                return NotFound();
            }

            return editor;
        }

        // PUT: api/Editors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEditor(int id, Editor editor)
        {
            if (id != editor.EditorId)
            {
                return BadRequest();
            }

            _context.Entry(editor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EditorExists(id))
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

        // POST: api/Editors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Editor>> PostEditor(Editor editor)
        {
            _context.Editor.Add(editor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEditor", new { id = editor.EditorId }, editor);
        }

        // DELETE: api/Editors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Editor>> DeleteEditor(int id)
        {
            var editor = await _context.Editor.FindAsync(id);
            if (editor == null)
            {
                return NotFound();
            }

            _context.Editor.Remove(editor);
            await _context.SaveChangesAsync();

            return editor;
        }

        private bool EditorExists(int id)
        {
            return _context.Editor.Any(e => e.EditorId == id);
        }
    }
}
