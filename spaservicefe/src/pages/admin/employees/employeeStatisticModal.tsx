import React, { useState } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import StatisticCard from './statisticCard'
import { Employee } from '@/types/type'
import PastAppointmentTable from './pastAppointmentTable'

interface EmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee
}

export default function EmployeeStatisticModal({ isOpen, onClose, employee }: EmployeeModalProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='mx-auto max-h-[90vh] w-[1500px] max-w-4xl font-montserrat'>
        <DialogTitle className='flex justify-center'>{employee.fullName} Statistics</DialogTitle>
        <div className='relative max-h-[70vh] overflow-y-auto'>
          <div className='mr-12 mt-4'>
            <div className='relative'>
              <select value={selectedYear} onChange={handleYearChange} className='absolute right-0 rounded border p-2'>
                {Array.from({ length: 3 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='px-6'>
            <StatisticCard employee={employee} year={selectedYear} />
          </div>
          <div className='px-2'>
            <PastAppointmentTable employee={employee} year={selectedYear} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
