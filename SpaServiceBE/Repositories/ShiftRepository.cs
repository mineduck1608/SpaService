using Microsoft.EntityFrameworkCore;
using Repositories.Context;
using Repositories.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class ShiftRepository
    {
        private readonly SpaServiceContext _context;

        public ShiftRepository(SpaServiceContext context)
        {
            _context = context;
        }

        // Get all shifts
        public async Task<IEnumerable<Shift>> GetAll()
        {
            return await _context.Shifts.ToListAsync();
        }

        // Get a shift by its ID
        public async Task<Shift> GetById(string id)
        {
            return await _context.Shifts.FirstOrDefaultAsync(s => s.ShiftId == id);
        }

        // Add a new shift
        public async Task<bool> Add(Shift shift)
        {
            _context.Shifts.Add(shift);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        // Update an existing shift
        public async Task<bool> Update(Shift shift, string id)
        {
            var existingShift = await _context.Shifts.FirstOrDefaultAsync(s => s.ShiftId == id);
            if (existingShift == null)
                return false;

            existingShift.ShiftName = shift.ShiftName;
            existingShift.StartTime = shift.StartTime;
            existingShift.EndTime = shift.EndTime;
            existingShift.Status = shift.Status;

            _context.Shifts.Update(existingShift);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        // Delete a shift by its ID
        public async Task<bool> Delete(string id)
        {
            var shift = await _context.Shifts.FirstOrDefaultAsync(s => s.ShiftId == id);
            if (shift == null)
                return false;

            _context.Shifts.Remove(shift);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
    }
}
