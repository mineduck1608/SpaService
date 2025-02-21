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
import { Employee } from '@/types/type' // Đổi kiểu dữ liệu thành Employee
import { MoreHorizontal } from 'lucide-react'
import UpdateEmployeeModal from './employeeUpdateModal'
import { ToastContainer } from 'react-toastify' 
import { handleDelete } from './employee.util'

interface EmployeeActionsProps {
  employee: Employee // Đổi từ Customer sang Employee
}

const EmployeeActions: React.FC<EmployeeActionsProps> = ({ employee }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => {
    setUpdateModalOpen(true)}
  const closeUpdateModal = () => setUpdateModalOpen(false)

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
            {' '}
            {/* Sao chép ID nhân viên */}
            Copy employee ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal}>Delete</DropdownMenuItem> {/* Xóa nhân viên */}
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
      <UpdateEmployeeModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} employee={employee}/>
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default EmployeeActions
