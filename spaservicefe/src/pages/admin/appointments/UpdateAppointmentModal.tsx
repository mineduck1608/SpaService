import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../../components/ui/dialog'
import { Label } from '../../../components/ui/label'
import { Appointment, Employee, Room } from '@/types/type'
import { DatePicker } from 'antd'
import {
  GetCategoryByServiceId,
  GetEmployeeByCategoryId,
  GetRoomsOfCategory
} from '../customerRequests/customerRequest.util'
import { getSpaRequestById } from '../transactions/transaction.util'

interface EditAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment
  onSave: (updatedAppointment: Appointment, roomId: string) => void
}

export function EditAppointmentModal({ isOpen, onClose, appointment, onSave }: EditAppointmentModalProps) {
  const [updatedAppointment, setUpdatedAppointment] = useState<Appointment>(appointment)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (appointment.requestId) {
        const request = await getSpaRequestById(appointment.requestId)
        const categoryData = await GetCategoryByServiceId(request.serviceId)
        const employeesData = await GetEmployeeByCategoryId(categoryData.categoryId)
        const roomData = await GetRoomsOfCategory(categoryData.categoryId)
        setEmployees(employeesData)
        setRooms(roomData)
      }
    }
    if (isOpen) {
      fetchData()
    }
  }, [isOpen])

  const handleChange = (field: string, value: string) => {
    if (value != '')
      setUpdatedAppointment((prevState) => ({
        ...prevState,
        [field]: value
      }))
    else {
      setUpdatedAppointment((prevState) => ({
        ...prevState,
        [field]: appointment.employeeId
      }))
    }
  }

  const handleSave = () => {
    onSave(updatedAppointment, updatedAppointment.roomId)
    console.log(updatedAppointment, updatedAppointment.roomId)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Appointment</DialogTitle>
          <DialogDescription>Modify the appointment details and save changes.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='ml-3 flex items-center gap-4'>
            <Label htmlFor='startTime' className='text-right'>
              Start Time
            </Label>
            <DatePicker
              step={1800}
              showTime
              showHour
              showMinute
              showSecond={false}
              minuteStep={30}
              className='w-75 border-[1px] p-2'
              onChange={(date) => handleChange('startTime', date ? date.format('DD/MM/YYYY HH:mm:ss') : '')}
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='employeeId' className='text-right'>
              Employee
            </Label>
            <select
              id='employeeId'
              value={updatedAppointment.employeeId || appointment.employeeId}
              onChange={(e) => handleChange('employeeId', e.target.value)}
              className='col-span-3 rounded-lg border p-2'
            >
              <option value=''>Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='roomId' className='text-right'>
              Room
            </Label>
            <select
              id='roomId'
              value={updatedAppointment.roomId || appointment.roomId}
              onChange={(e) => handleChange('roomId', e.target.value)}
              className='col-span-3 rounded-lg border p-2'
            >
              <option value=''>Select Room</option>
              {rooms.map((room) => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomNum}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
