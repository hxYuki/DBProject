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
    public class NewsController : ControllerBase
    {
        private readonly NewsContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public NewsController(NewsContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<News> GetANews(int id)
        {
            var news = await _context.News.FindAsync(id);

            return news;
        }
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        // GET: api/News
        [HttpGet("view")]
        public async Task<ActionResult<IEnumerable<object>>> GetNews()
        {
            var news = from n in _context.News where n.Status == 1 select new { n.Abstract, n.PublishTime, n.Title, n.NewsId };
            return await news.ToListAsync();
        }
        
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        // GET: api/News/5
        [HttpGet("view/{id}")]
        public ActionResult<object> GetNews(int id)
        {
            var uid = int.Parse(_httpContextAccessor.HttpContext.Request.Headers["uid"]);
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            var news = (from n in _context.News where n.NewsId==id &&(n.JournalistId==uid||isEditor||n.Status==1) select new { n.Content, n.PublishTime, n.Title, n.NewsId }).FirstOrDefault();

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }
        [HttpGet("draft")]
        public async Task<ActionResult<IEnumerable<News>>> Getdrafts()
        {
            var uid = int.Parse(_httpContextAccessor.HttpContext.Request.Headers["uid"]);
            var news = from n in _context.News where n.Status == 10 && n.JournalistId == uid select n;
            return await news.ToListAsync();
        }
        [HttpGet("draft/{id}")]
        public ActionResult<News> GetDraft(int id)
        {
            var uid = int.Parse(_httpContextAccessor.HttpContext.Request.Headers["uid"]);
            var news = (from n in _context.News where n.NewsId == id && n.JournalistId == uid select n).FirstOrDefault();

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }
        
        [HttpPost("adddraft")]
        public async Task<ActionResult<News>> PostDraft(News news)
        {
            var headers = _httpContextAccessor.HttpContext.Request.Headers;
            news.Status = 10;
            news.CreateTime = DateTime.Now;
            news.JournalistId = int.Parse(headers["uid"]);

            var r = _context.News.Add(news);
            await _context.SaveChangesAsync();

            return Ok(new { draftId = r.Entity.NewsId });
        }
        [HttpPut("draft/{id}")]
        public async Task<ActionResult<News>> PutDraft(int id, News nnews)
        {
            var news = await GetANews(id);
            if (news == null)
                return NotFound();
            //var headers = _httpContextAccessor.HttpContext.Request.Headers;
            news.Content = nnews.Content;
            news.Raw = nnews.Raw;
            news.Title = nnews.Title;
            news.Status = 10;
            news.CreateTime = DateTime.Now;
            //news.JournalistId = int.Parse(headers["uid"]);
            _context.Entry(news).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
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
        [HttpGet("submit")]
        public async Task<ActionResult<IEnumerable<News>>> GetSubmitted()
        {
            var uid = int.Parse(_httpContextAccessor.HttpContext.Request.Headers["uid"]);
            var news = from n in _context.News where n.JournalistId == uid && n.Status!=10 select n;
            return await news.ToListAsync();
        }
        [HttpPost("submit")]
        public async Task<ActionResult<News>> PostNews(News news)
        {
            var headers = _httpContextAccessor.HttpContext.Request.Headers;
            news.Status = 0;
            news.SubmitTime = DateTime.Now;
            news.CreateTime = DateTime.Now;
            news.JournalistId = int.Parse(headers["uid"]);

            var r = _context.News.Add(news);
            await _context.SaveChangesAsync();

            return Ok(new { newsId= r.Entity.NewsId});
        }
        [HttpPut("submit/{id}")]
        public async Task<IActionResult> PutNews(int id, News nnews)
        {
            var news = await GetANews(id);
            if (news == null)
                return NotFound();
            //var headers = _httpContextAccessor.HttpContext.Request.Headers;
            news.Content = nnews.Content;
            news.Raw = nnews.Raw;
            news.Title = nnews.Title;
            news.Status = 0;
            news.SubmitTime = DateTime.Now;
            //news.JournalistId = int.Parse(headers["uid"]);
            _context.Entry(news).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
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

        [HttpGet("review")]
        public async Task<ActionResult<IEnumerable<News>>> GetReview()
        {
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            if (!isEditor)
                return NoContent();
            var news = from n in _context.News where n.Status==0 select n;
            return await news.ToListAsync();
        }
        public class ReviewResult
        {
            public bool Pass { get; set; }
            public string Content { get; set; }
        }
        [HttpPut("review/{id}")]
        public async Task<IActionResult> ReviewNews(int id, ReviewResult review)
        {
            var isEditor = bool.Parse(_httpContextAccessor.HttpContext.Request.Headers["isEditor"]);
            if (!isEditor)
                return NotFound();

            var news = await GetANews(id);
            if (news == null)
                return NotFound();
            
            var headers = _httpContextAccessor.HttpContext.Request.Headers;
            if (review.Pass)
            {
                news.Status = 1;
                news.PublishTime = DateTime.Now;
                news.Abstract = review.Content;
            }
            else
            {
                news.Status = -1;
                news.Remark = review.Content;
            }
            _context.Entry(news).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
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
        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<News>> DeleteNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            return news;
        }

        private bool NewsExists(int id)
        {
            return _context.News.Any(e => e.NewsId == id);
        }
    }
}
