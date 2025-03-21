import React from 'react'
import CheckInModal from './checkInModal'

interface CheckInTable {
  checkInTime: string | null
  onCheckInSuccess: (time: string) => void
}

const AttendanceInfo: React.FC<CheckInTable> = ({ checkInTime, onCheckInSuccess }) => {
  return (
    <div className='container mx-auto w-[30%] rounded-md border mb-2 p-2'>
      <h3 className='mb-3 font-medium'>Today's Attendance</h3>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <div className='mb-2'>
            <span className='text-gray-600'>Date: </span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div>
            <span className='text-gray-600'>Check-in Time: </span>
            <span>{checkInTime ? new Date(checkInTime).toLocaleTimeString() : '-'}</span>
          </div>
        </div>
        <div className='flex items-center'>
          <CheckInModal onCheckInSuccess={onCheckInSuccess} />
        </div>
      </div>
    </div>
  )
}

export default AttendanceInfo