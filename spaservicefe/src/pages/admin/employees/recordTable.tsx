import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ToastContainer } from 'react-toastify'
import { getAllEmployees, getRecords } from '../checkIn/record.util'
import { jwtDecode } from 'jwt-decode'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from 'src/components/ui/table'
import { Record } from '@/types/type'
import { months } from 'src/types/date'

interface RecordModalProps {
  isOpen: boolean
  onClose: () => void
  employee: any
}

export default function RecordModal({ isOpen, onClose, employee }: RecordModalProps) {
  const [records, setRecords] = useState<Record[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value))
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value))
  }

  const totalWorkingHours = records.reduce((total, record) => {
    const checkIn = record.checkInTime ? new Date(record.checkInTime) : null
    const checkOut = record.checkOutTime ? new Date(record.checkOutTime) : null
    
    if (checkIn && checkOut) {
      const workingHours = Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60))
      return total + workingHours;
    }
    
    return total
  }, 0)

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const token = sessionStorage.getItem('token')
      if (token) {
        // const decodedToken: any = jwtDecode(token)
        // //const accountId = decodedToken.UserId
        // const accountId = 'a5086aa620714784b545ed57f24b7acc'

        // const employees = await getAllEmployees()
        // const employee = employees.find((emp) => emp.accountId === accountId)
        if (employee) {
          const records = await getRecords()
          const filteredRecords = records.filter(record => {
            if (record.employeeId !== employee.employeeId) return false

            const checkIn = record.checkInTime ? new Date(record.checkInTime) : null
            const checkOut = record.checkOutTime ? new Date(record.checkOutTime) : null
            return (
              (checkIn && checkIn.getFullYear() === selectedYear && checkIn.getMonth() + 1 === selectedMonth) ||
              (checkOut && checkOut.getFullYear() === selectedYear && checkOut.getMonth() + 1 === selectedMonth)
            )
          })
          setRecords(filteredRecords)
        }
      }
    }
    fetchAccountDetails()
  }, [selectedYear, selectedMonth])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10 font-montserrat max-h-[90vh] w-[700px] max-w-3xl'>
        <DialogTitle className='flex justify-center'>{employee?.fullName} Check-In Records</DialogTitle>
        <div className='flex justify-end gap-4'>
          <select value={selectedMonth} onChange={handleMonthChange} className='rounded border p-2'>
            {months.map((month, i) => (
              <option key={i} value={i + 1}>{month}</option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange} className='rounded border p-2'>
            {Array.from({ length: 3 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
        <Table className='-mt-2 mb-5 w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>No</TableHead>
              <TableHead className='text-center'>Check-In Time</TableHead>
              <TableHead className='text-center'>Check-Out Time</TableHead>
              <TableHead className='text-center'>Working Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => {
              const checkIn = record.checkInTime ? new Date(record.checkInTime) : null
              const checkOut = record.checkOutTime ? new Date(record.checkOutTime) : null
              const workingHours = checkIn && checkOut
                ? Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60))
                : 'N/A'

              return (
                <TableRow key={record.attendanceId}>
                  <TableCell className='text-center'>{index + 1}</TableCell>
                  <TableCell className='text-center'>{checkIn ? checkIn.toLocaleString() : 'N/A'}</TableCell>
                  <TableCell className='text-center'>{checkOut ? checkOut.toLocaleString() : 'N/A'}</TableCell>
                  <TableCell className='text-center'>{workingHours}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className='text-right'>Total Working Hours</TableCell>
              <TableCell className='text-center'>{totalWorkingHours}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}