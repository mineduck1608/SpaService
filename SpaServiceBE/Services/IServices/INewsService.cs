using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface INewsService
    {
        Task<News> GetNewsById(string newsId);
        Task<List<News>> GetAllNews();
        Task<bool> AddNews(News news);
        Task<bool> UpdateNews(string newsId, News news);
        Task<bool> DeleteNews(string newsId);
        Task<News> GetNewsByType(string type);
    }
}
