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

interface EmployeeActionsProps {
  employee: Employee // Đổi từ Customer sang Employee
}

const EmployeeActions: React.FC<EmployeeActionsProps> = ({ employee }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleConfirmDelete = () => {
    console.log(`Deleting employee with id: ${employee.employeeId}`) // In ra ID nhân viên thay vì khách hàng
    closeModal()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
          <DropdownMenuItem>Update</DropdownMenuItem> {/* Cập nhật thông tin nhân viên */}
          <DropdownMenuItem onClick={openModal}>Delete</DropdownMenuItem> {/* Xóa nhân viên */}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default EmployeeActions
