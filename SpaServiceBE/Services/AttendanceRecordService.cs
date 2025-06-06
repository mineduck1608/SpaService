﻿using Repositories.Entities;
using Repositories.Repositories;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services
{
    public class AttendanceRecordService : IAttendanceRecordService
    {
        private readonly AttendanceRecordRepository _attendanceRecordRepository;

        public AttendanceRecordService(AttendanceRecordRepository attendanceRecordRepository)
        {
            _attendanceRecordRepository = attendanceRecordRepository ?? throw new ArgumentNullException(nameof(attendanceRecordRepository));
        }

        public async Task<IEnumerable<AttendanceRecord>> GetAllAttendanceRecords()
        {
            return await _attendanceRecordRepository.GetAll();
        }

        public async Task<AttendanceRecord> GetAttendanceRecordById(string id)
        {
            return await _attendanceRecordRepository.GetById(id);
        }

        public async Task<bool> AddAttendanceRecord(AttendanceRecord attendanceRecord)
        {
            return await _attendanceRecordRepository.Add(attendanceRecord);
        }

        public async Task<bool> UpdateAttendanceRecord(AttendanceRecord attendanceRecord, string id)
        {
            return await _attendanceRecordRepository.Update(attendanceRecord, id);
        }

        public async Task<bool> DeleteAttendanceRecord(string id)
        {
            return await _attendanceRecordRepository.Delete(id);
        }

        public async Task<AttendanceRecord?> GetLatestAttendanceByEmployeeId(string employeeId)
        {
            return await _attendanceRecordRepository.GetLatestAttendanceByEmployeeId(employeeId);
        }

        public async Task AddAttendance(AttendanceRecord attendance)
        {
            await _attendanceRecordRepository.AddAttendance(attendance);
        }

        public async Task UpdateAttendance(AttendanceRecord attendance)
        {
            await _attendanceRecordRepository.UpdateAttendance(attendance);
        }

        public async Task<AttendanceRecord?> GetLatestCheckInTodayAsync(string employeeId)
        {
            return await _attendanceRecordRepository.GetLatestCheckInTodayAsync(employeeId);
        }

}
}
