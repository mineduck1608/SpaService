using Repositories;
using Repositories.Entities;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly FeedbackRepository _repository;

        public FeedbackService(FeedbackRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // Lấy Feedback theo ID
        public async Task<Feedback> GetFeedbackById(string feedbackId)
        {
            return await _repository.GetById(feedbackId);
        }

        // Lấy tất cả Feedbacks
        public async Task<List<Feedback>> GetAllFeedbacks()
        {
            return await _repository.GetAll();
        }

        // Thêm mới Feedback
        public async Task<bool> AddFeedback(Feedback feedback)
        {
            return await _repository.Add(feedback);
        }

        // Cập nhật Feedback
        public async Task<bool> UpdateFeedback(string feedbackId, Feedback feedback)
        {
            return await _repository.Update(feedbackId, feedback);
        }

        // Xóa Feedback
        public async Task<bool> DeleteFeedback(string feedbackId)
        {
            return await _repository.Delete(feedbackId);
        }
    }
}
