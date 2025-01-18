using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IFeedbackService
    {
        Task<Feedback> GetFeedbackById(string feedbackId);
        Task<List<Feedback>> GetAllFeedbacks();
        Task<bool> AddFeedback(Feedback feedback);
        Task<bool> UpdateFeedback(string feedbackId, Feedback feedback);
        Task<bool> DeleteFeedback(string feedbackId);
    }
}
