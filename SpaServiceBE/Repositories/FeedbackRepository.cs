﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repositories.Entities;
using Repositories.Context;

namespace Repositories
{
    public class FeedbackRepository
    {
        private readonly SpaserviceContext _context;

        public FeedbackRepository(SpaserviceContext context)
        {
            _context = context;
        }

        // Lấy Feedback theo ID với các thực thể liên quan
        public async Task<Feedback> GetById(string feedbackId)
        {
            return await _context.Feedbacks
                .Include(f => f.CreatedByNavigation)   // Bao gồm Customer (CreatedBy) liên quan đến Feedback
                .Include(f => f.Appointment)               // Bao gồm SpaService liên quan đến Feedback
                .FirstOrDefaultAsync(f => f.FeedbackId == feedbackId);
        }

        public async Task<List<Feedback>> GetByServiceId(string id)
        {
            return await _context.Feedbacks
             .Include(f => f.CreatedByNavigation)
             .Include(f => f.Appointment)
                 .ThenInclude(a => a.Request)
             .Where(f => f.Appointment.Request.ServiceId == id)
             .ToListAsync();
        }

        public async Task<Feedback> GetByAppointmentId(string id)
        {
            return await _context.Feedbacks.FirstOrDefaultAsync(x => x.AppointmentId == id);
        }


        // Lấy tất cả Feedbacks với các thực thể liên quan
        public async Task<List<Feedback>> GetAll()
        {
            return await _context.Feedbacks
                .Include(f => f.CreatedByNavigation)   // Bao gồm Customer (CreatedBy) liên quan đến Feedback
                .Include(f => f.Appointment)               // Bao gồm SpaService liên quan đến Feedback
                .ToListAsync();
        }

        // Thêm một Feedback mới
        public async Task<bool> Add(Feedback feedback)
        {
            try
            {
                await _context.Feedbacks.AddAsync(feedback);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Cập nhật Feedback
        public async Task<bool> Update(string feedbackId, Feedback feedback)
        {
            var existingFeedback = await GetById(feedbackId);
            if (existingFeedback == null) return false;

            existingFeedback.FeedbackMessage = feedback.FeedbackMessage;
            existingFeedback.Rating = feedback.Rating;
            existingFeedback.CreatedAt = feedback.CreatedAt;
            existingFeedback.AppointmentId = feedback.AppointmentId;

            try
            {
                _context.Feedbacks.Update(existingFeedback);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // Xóa Feedback
        public async Task<bool> Delete(string feedbackId)
        {
            var feedback = await GetById(feedbackId);
            if (feedback == null) return false;

            try
            {
                _context.Feedbacks.Remove(feedback);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public Dictionary<int, int> OrderByRating()
        {
            var subtracted = DateTime.Now.AddYears(-1);
            var lower = new DateTime(subtracted.Year, subtracted.Month, 1);
            var rs = new Dictionary<int, int>();
            var fb = _context.Feedbacks
                .Where(x => x.CreatedAt >= lower);
            foreach (var item in fb)
            {
                if (rs.ContainsKey(item.Rating))
                {
                    rs[item.Rating]++;
                }
                else
                {
                    rs.Add(item.Rating, 1);
                }
            }
            for (int i = 1; i <= 5; i++)
            {
                if (!rs.ContainsKey(i))
                {
                    rs.Add(i, 0);
                }
            }
            return rs;
        }
    }
}
