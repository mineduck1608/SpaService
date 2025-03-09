import React, { useEffect, useState } from 'react'
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='mx-auto w-[1500px] max-w-4xl max-h-[90vh] font-montserrat'>
        <DialogTitle className='flex justify-center'>{employee.fullName} Statistics</DialogTitle>
        <div className='max-h-[70vh] overflow-y-auto'>
          <div className='px-10'>
            <StatisticCard employee={employee}/>
          </div>
          <div className='px-10'>
            <PastAppointmentTable employee={employee}/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
