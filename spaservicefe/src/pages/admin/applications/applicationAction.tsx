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
import { Application } from '@/types/type' // Đổi kiểu dữ liệu thành Employee
import { MoreHorizontal } from 'lucide-react'
import UpdateApplicationModal from './applicationUpdateModal'
import { ToastContainer } from 'react-toastify' 
import { handleDelete } from './application.util'

interface ApplicationActionsProps {
  application: Application // Đổi từ Customer sang Employee
}

const EmployeeActions: React.FC<ApplicationActionsProps> = ({ application }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => {
    setUpdateModalOpen(true)}
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const handleConfirmDelete = async () => {
    handleDelete(application.applicationId)
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(application.applicationId)}>
            {' '}
            {/* Sao chép ID nhân viên */}
            Copy application ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal}>Delete</DropdownMenuItem> {/* Xóa nhân viên */}
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
      
      <UpdateApplicationModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} application={application}/>
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default EmployeeActions
