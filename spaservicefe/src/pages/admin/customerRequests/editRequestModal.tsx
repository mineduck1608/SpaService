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
import { SpaRequest, Employee, Room } from '@/types/type'
import { GetCategoryByServiceId, GetEmployeeByCategoryId, getRequestById, GetRoomsOfCategory } from './customerRequest.util'
import { DatePicker } from 'antd'
import { getSpaRequestById } from '../transactions/transaction.util'

interface EditRequestModalProps {
  isOpen: boolean
  onClose: () => void
  request: SpaRequest
  onSave: (updatedRequest: SpaRequest, roomId: string) => void
}

export function EditRequestModal({ isOpen, onClose, request, onSave }: EditRequestModalProps) {
  const [updatedRequest, setUpdatedRequest] = useState<SpaRequest>(request)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoomId, setSelectedRoomId] = useState<string>('') // Track roomId separately

  useEffect(() => {
    const fetchData = async () => {
      if (request) {
        const fetchRequest = await getRequestById(request.requestId)
        const categoryData = await GetCategoryByServiceId(fetchRequest.serviceId)
        const employeesData = await GetEmployeeByCategoryId(categoryData.categoryId)
        const roomData = await GetRoomsOfCategory(categoryData.categoryId)
        setEmployees(employeesData)
        setRooms(roomData)
      }
    }

    if (isOpen) {
      fetchData()
    }
  }, [isOpen, request.requestId])

  const handleChange = (field: string, value: string) => {
    setUpdatedRequest((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleRoomChange = (value: string) => {
    setSelectedRoomId(value) // Track selected room ID
  }

  const handleSave = () => {
    onSave(updatedRequest, selectedRoomId) // Pass updatedRequest and selectedRoomId
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Request</DialogTitle>
          <DialogDescription>Make changes to the request information. Click save when you're done.</DialogDescription>
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
              value={updatedRequest.employeeId || ''}
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
              value={selectedRoomId}
              onChange={(e) => handleRoomChange(e.target.value)}
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
