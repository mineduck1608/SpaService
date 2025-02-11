using Repositories;
using Repositories.Entities;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class NewsService : INewsService
    {
        private readonly NewsRepository _repository;

        public NewsService(NewsRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Get a News by ID
        public async Task<News> GetNewsById(string newsId)
        {
            return await _repository.GetById(newsId);
        }

        // Get all News
        public async Task<List<News>> GetAllNews()
        {
            return await _repository.GetAll();
        }

        // Add a new News
        public async Task<bool> AddNews(News news)
        {
            return await _repository.Add(news);
        }

        // Update an existing News
        public async Task<bool> UpdateNews(string newsId, News news)
        {
            return await _repository.Update(newsId, news);
        }

        // Delete a News
        public async Task<bool> DeleteNews(string newsId)
        {
            return await _repository.Delete(newsId);
        }
    }
}
