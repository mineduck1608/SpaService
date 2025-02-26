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
import { CategoryEmployee } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { handleDelete } from './employeeCategory.util'
import UpdateEmployeeCategoryModal from './employeeCategoryUpdateModal'

interface EmployeeCategoryActionsProps {
  employeeCategory: CategoryEmployee
}

const EmployeeCategoryActions: React.FC<EmployeeCategoryActionsProps> = ({ employeeCategory }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const handleConfirmDelete = async () => {
    handleDelete(employeeCategory)
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employeeCategory.categoryEmployeeId)} className='cursor-pointer'>
            Copy Employee Category ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal} className='cursor-pointer'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
      <UpdateEmployeeCategoryModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} employeeCategory={employeeCategory}/>
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default EmployeeCategoryActions
