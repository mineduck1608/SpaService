using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class NewsRepository
    {
        private readonly SpaServiceContext _context;

        public NewsRepository(SpaServiceContext context)
        {
            _context = context;
        }

        // Lấy News theo ID
        public async Task<News> GetById(string newsId)
        {
            return await _context.News
                .FirstOrDefaultAsync(n => n.NewsId == newsId);
        }

        public async Task<News> GetNewsByType(string type)
        {
            return await _context.News
                .FirstOrDefaultAsync(n => n.Type == type);
        }

        // Lấy tất cả News
        public async Task<List<News>> GetAll()
        {
            return await _context.News.ToListAsync();
        }

        // Thêm một News mới
        public async Task<bool> Add(News news)
        {
            try
            {
                await _context.News.AddAsync(news);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật News
        public async Task<bool> Update(string newsId, News news)
        {
            var existingNews = await GetById(newsId);
            if (existingNews == null) return false;

            existingNews.Header = news.Header;
            existingNews.Content = news.Content;
            existingNews.CreateAt = news.CreateAt;
            existingNews.Type = news.Type;
            existingNews.Image = news.Image;

            try
            {
                _context.News.Update(existingNews);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa News
        public async Task<bool> Delete(string newsId)
        {
            var news = await GetById(newsId);
            if (news == null) return false;

            try
            {
                _context.News.Remove(news);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
