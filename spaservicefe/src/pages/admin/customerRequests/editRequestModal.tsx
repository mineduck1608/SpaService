import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { SpaRequest, Employee } from '@/types/type'
import { GetCategoryByServiceId, GetEmployeeByCategoryId } from './customerRequest.util'
import { DatePicker } from 'antd'

interface EditRequestModalProps {
  isOpen: boolean
  onClose: () => void
  request: SpaRequest
  onSave: (updatedRequest: SpaRequest) => void
}

export function EditRequestModal({ isOpen, onClose, request, onSave }: EditRequestModalProps) {
  const [updatedRequest, setUpdatedRequest] = useState<SpaRequest>(request)
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      if (request.serviceId) {
        console.log(request.serviceId)
        const categoryData = await GetCategoryByServiceId(request.serviceId)
        console.log(categoryData)
        const employeesData = await GetEmployeeByCategoryId(categoryData.categoryId)
        setEmployees(employeesData)
      }
    }

    if (isOpen) {
      fetchEmployees()
    }
  }, [isOpen, request.serviceName])

  const handleChange = (field: string, value: string) => {
    setUpdatedRequest((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleSave = () => {
    onSave(updatedRequest)
    console.log(updatedRequest)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Request</DialogTitle>
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
              onChange={(date) => handleChange('startTime', date ? date.format('YYYY-MM-DD HH:mm:ss') : '')}
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
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
