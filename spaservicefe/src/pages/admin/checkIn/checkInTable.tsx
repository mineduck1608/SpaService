import React, { useEffect, useState } from 'react'
import CheckInModal from './checkInModal'
import { getLatestCheckIn, getAllEmployees } from './record.util'
import { jwtDecode } from 'jwt-decode'

interface CheckInTable {
  onCheckInSuccess: (time: string) => void
  onCheckOutSuccess: (time: string) => void
}

const AttendanceInfo: React.FC<CheckInTable> = ({ onCheckInSuccess, onCheckOutSuccess }) => {
  const [employeeId, setEmployeeId] = useState<string | null>(null)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmployeeId = async () => {
      try {
        const token = sessionStorage.getItem('token')
        if (token) {
          const decodedToken: any = jwtDecode(token)
          const userId = decodedToken.UserId

          const employees = await getAllEmployees()
          const employee = employees.find((emp) => emp.accountId === userId)

          if (employee) {
            setEmployeeId(employee.employeeId)
          }
        }
      } catch (error) {
        console.error('Error fetching employee ID:', error)
      }
    }

    fetchEmployeeId()
  }, [])

  useEffect(() => {
    const fetchLatestCheckIn = async () => {
      if (employeeId) {
        const { checkInTime, checkOutTime } = await getLatestCheckIn(employeeId)
        setCheckInTime(checkInTime)
        setCheckOutTime(checkOutTime)
      }
    }

    fetchLatestCheckIn()
  }, [employeeId])

  return (
    <div className='flex justify-end px-11'>
      <div className='mb-2 w-[100%] rounded-md border p-2'>
        <h3 className='mb-3 text-center text-xl font-medium'>Today's Attendance</h3>
        <div className='flex justify-between'>
          <div className='flex space-x-8'>
            <div className='flex items-center space-x-2'>
              <span className='font-bold text-gray-600'>Date: </span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className='flex items-center space-x-2 pl-64'>
              <span className='font-bold text-gray-600'>Check-in Time: </span>
              <span>{checkInTime ? new Date(checkInTime).toLocaleTimeString() : '-'}</span>
            </div>
            <div className='flex items-center space-x-2 pl-64'>
              <span className='font-bold text-gray-600'>Check-out Time: </span>
              <span>{checkOutTime ? new Date(checkOutTime).toLocaleTimeString() : '-'}</span>
            </div>
          </div>
          <div className='flex gap-2'>
            <CheckInModal onCheckInSuccess={onCheckInSuccess} onCheckOutSuccess={onCheckOutSuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceInfo