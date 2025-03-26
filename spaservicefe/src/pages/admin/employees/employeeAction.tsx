import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu'
import { ConfirmDeleteModal } from '../components/deleteModal'
import { Employee } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import UpdateEmployeeModal from './employeeUpdateModal'
import { handleDelete } from './employee.util'
import EmployeeStatisticModal from './employeeStatisticModal'
import RecordModal from './recordTable'

interface EmployeeActionsProps {
  employee: Employee
}

const EmployeeActions: React.FC<EmployeeActionsProps> = ({ employee }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isStatisticModalOpen, setStatisticModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [isRecordModalOpen, setRecordModalOpen] = useState(false)

  const openStatisticModal = () => setStatisticModalOpen(true)
  const closeStatisticModal = () => setStatisticModalOpen(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const openRecordModal = () => setRecordModalOpen(true)
  const closeRecordModal = () => setRecordModalOpen(false)

  const handleConfirmDelete = async () => {
    handleDelete(employee.employeeId)
    closeDeleteModal()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.employeeId)}>
            Copy employee ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openStatisticModal} className='cursor-pointer'>
            View Statistics
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openRecordModal} className='cursor-pointer'>
            View Check-In Records
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal} className='cursor-pointer'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RecordModal isOpen={isRecordModalOpen} onClose={closeRecordModal} employee={employee}/>
      <EmployeeStatisticModal isOpen={isStatisticModalOpen} onClose={closeStatisticModal} employee={employee} />
      <UpdateEmployeeModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} employee={employee} />
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default EmployeeActions
