using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/news")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _service;

        public NewsController(INewsService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // GET: api/news/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<News>>> GetAllNews()
        {
            try
            {
                var news = await _service.GetAllNews();
                return Ok(news);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/news/GetById/{id}
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<News>> GetNewsById(string id)
        {
            try
            {
                var news = await _service.GetNewsById(id);

                if (news == null)
                    return NotFound($"News with ID = {id} not found.");

                return Ok(news);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/news/Create
        [HttpPost("Create")]
        public async Task<ActionResult> CreateNews([FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string header = jsonElement.GetProperty("header").GetString();
                string content = jsonElement.GetProperty("content").GetString();
                string type = jsonElement.GetProperty("type").GetString();
                string? image = jsonElement.TryGetProperty("image", out var img) ? img.GetString() : null;

                // Validate input
                if (string.IsNullOrEmpty(header) || string.IsNullOrEmpty(content) || string.IsNullOrEmpty(type))
                {
                    return BadRequest(new { msg = "News details are incomplete or invalid." });
                }

                // Create News object
                var news = new News
                {
                    NewsId = Guid.NewGuid().ToString(), // Generate unique ID
                    Header = header,
                    Content = content,
                    Type = type,
                    Image = image,
                };

                // Call service to add news
                var isCreated = await _service.AddNews(news);

                if (!isCreated)
                    return StatusCode(500, new { msg = "An error occurred while creating the news." });

                return CreatedAtAction(nameof(GetNewsById), new { id = news.NewsId }, news);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        // PUT: api/news/Update/{id}
        [Authorize]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateNews(string id, [FromBody] dynamic request)
        {
            try
            {
                var jsonElement = (JsonElement)request;

                // Lấy dữ liệu từ request
                string header = jsonElement.GetProperty("header").GetString();
                string content = jsonElement.GetProperty("content").GetString();
                string type = jsonElement.GetProperty("type").GetString();
                string? image = jsonElement.TryGetProperty("image", out var img) ? img.GetString() : null;

                // Validate input
                if (string.IsNullOrEmpty(header) || string.IsNullOrEmpty(content) || string.IsNullOrEmpty(type))
                {
                    return BadRequest(new { msg = "News details are incomplete or invalid." });
                }

                // Create News object and assign ID for update
                var news = new News
                {
                    NewsId = id, // Use the provided ID for the update
                    Header = header,
                    Content = content,
                    Type = type,
                    Image = image,
                };

                // Call service to update news
                var isUpdated = await _service.UpdateNews(id, news);

                if (!isUpdated)
                    return NotFound(new { msg = $"News with ID = {id} not found." });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { msg = "Internal server error", error = ex.Message });
            }
        }

        // DELETE: api/news/Delete/{id}
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteNews(string id)
        {
            try
            {
                var isDeleted = await _service.DeleteNews(id);

                if (!isDeleted)
                    return NotFound($"News with ID = {id} not found.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // New GetAllBlog method
       
        [HttpGet("GetAllBlog")]
        public async Task<ActionResult<IEnumerable<News>>> GetAllBlogs()
        {
            try
            {
                var blogs = await _service.GetNewsByType("Blog"); // Filter news by type "Blog"
                return Ok(blogs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // New GetAllPromotion method
        
        [HttpGet("GetAllPromotion")]
        public async Task<ActionResult<IEnumerable<News>>> GetAllPromotions()
        {
            try
            {
                var promotions = await _service.GetNewsByType("PromotionCode"); // Filter news by type "PromotionCode"
                return Ok(promotions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // New GetAllEvent method
       
        [HttpGet("GetAllEvent")]
        public async Task<ActionResult<IEnumerable<News>>> GetAllEvents()
        {
            try
            {
                var events = await _service.GetNewsByType("Event"); // Filter news by type "Event"
                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
