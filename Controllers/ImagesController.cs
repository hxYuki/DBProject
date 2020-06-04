using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DBProject.Data;
using DBProject.Models;
using System.IO;
using System.Net.Http;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace DBProject.Controllers
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly ImageContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ImagesController(ImageContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Images/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetImage(long id)
        {
            var image = await _context.Image.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }
            var contentTypDict = new Dictionary<string, string> {
                {".jpg","image/jpeg"},
                {".jpeg","image/jpeg"},
                {".jpe","image/jpeg"},
                {".png","image/png"},
                {".gif","image/gif"},
                {".ico","image/x-ico"},
                {".tif","image/tiff"},
                {".tiff","image/tiff"},
                {".webp","image/webp"}
            };
            var contentTypeStr = "image/jpeg";
            var ext = Path.GetExtension(image.Path);
            using (var sw = new FileStream(image.Path, FileMode.Open))
            {
                var bytes = new byte[sw.Length];
                sw.Read(bytes, 0, bytes.Length);
                sw.Close();
                return new FileContentResult(bytes, contentTypDict[ext]);
            }
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(long id, Image image)
        {
            if (id != image.ImageId)
            {
                return BadRequest();
            }

            _context.Entry(image).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
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

        // POST: api/Images
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("post")]
        public async Task<ActionResult<Image>> PostImage([FromForm] IFormFile image)
        {
            var headers = _httpContextAccessor.HttpContext.Request.Headers;
            var f = Request.Form.Files;
            if (image.Length > 0)
            {
                string ext = Path.GetExtension(image.FileName);
                string filename = Path.GetRandomFileName();
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "images",
                    filename+ ext);

                using (var stream = System.IO.File.Create(filePath))
                {
                    await image.CopyToAsync(stream);
                }
                var r = _context.Image.Add(new Image { JournalistId = int.Parse(headers["uid"]), Path = filePath });
                await _context.SaveChangesAsync();

                return Ok(new { pid = r.Entity.ImageId });
            }

            return Ok();
        }

        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Image>> DeleteImage(long id)
        {
            var image = await _context.Image.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Image.Remove(image);
            await _context.SaveChangesAsync();

            return image;
        }

        private bool ImageExists(long id)
        {
            return _context.Image.Any(e => e.ImageId == id);
        }
    }
}
