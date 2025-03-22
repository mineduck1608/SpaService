import React from 'react'
import CheckInModal from './checkInModal'

interface CheckInTable {
  checkInTime: string | null
  checkOutTime: string | null
  onCheckInSuccess: (time: string) => void
  onCheckOutSuccess: (time: string) => void
}

const AttendanceInfo: React.FC<CheckInTable> = ({ checkInTime, checkOutTime, onCheckInSuccess, onCheckOutSuccess }) => {
  return (
    <div className='flex justify-end px-11'>
    <div className='w-[100%] rounded-md border mb-2 p-2'>
      <h3 className='mb-3 font-medium text-center text-xl'>Today's Attendance</h3>
      <div className='flex justify-between'>
        <div className='flex space-x-8'>
          <div className='flex items-center space-x-2'>
            <span className='text-gray-600 font-bold'>Date: </span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className='flex items-center space-x-2 pl-64'>
            <span className='text-gray-600 font-bold'>Check-in Time: </span>
            <span>{checkInTime ? new Date(checkInTime).toLocaleTimeString() : '-'}</span>
          </div>
          <div className='flex items-center space-x-2 pl-64'>
            <span className='text-gray-600 font-bold'>Check-out Time: </span>
            <span>{checkOutTime ? new Date(checkOutTime).toLocaleTimeString() : '-'}</span>
          </div>
        </div>
        <div className='flex gap-2'>
          <CheckInModal 
          onCheckInSuccess={onCheckInSuccess} 
          onCheckOutSuccess={onCheckOutSuccess}
          />
        </div>
      </div>
    </div>
    </div>
  )
}

export default AttendanceInfo