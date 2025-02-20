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
import BaseModal from '../baseModal'
import { getToken } from '../../../types/constants'
import { toast, ToastContainer } from 'react-toastify' 

interface EmployeeActionsProps {
  employee: Employee // Đổi từ Customer sang Employee
}

const EmployeeActions: React.FC<EmployeeActionsProps> = ({ employee }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const handleConfirmDelete = async () => {
      console.log(`Deleting customer with id: ${employee.employeeId}`)
      try {
        const response = await fetch(`https://localhost:7205/api/employees/Delete/${employee.employeeId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 200 || response.status === 204) {
          toast.success('Delete successfully', {
            autoClose: 3000,
            onClose: () => window.location.reload()
          })
        } else {
          toast.error('Delete failed. Try again.')
        }
      } catch (error) {
        console.error('Error deleting account:', error)
      } 
      closeDeleteModal()
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
          
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal}>Delete</DropdownMenuItem> {/* Xóa nhân viên */}
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
      <BaseModal 
        isOpen={isUpdateModalOpen} 
        onClose={closeUpdateModal} 
        entity='Employee' 
        type='Update' 
        rowData={employee}
      />
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default EmployeeActions
