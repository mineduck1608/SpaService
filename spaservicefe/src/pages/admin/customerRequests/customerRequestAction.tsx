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
import { Request } from '@/types/type' // Đổi từ Account sang Request
import { MoreHorizontal } from 'lucide-react'
import { EditRequestModal } from './editRequestModal' // Import modal chỉnh sửa yêu cầu

interface RequestActionsProps {
  request: Request // Cập nhật type từ Account thành Request
}

const RequestActions: React.FC<RequestActionsProps> = ({ request }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const openEditModal = () => setEditModalOpen(true) // Mở modal chỉnh sửa
  const closeEditModal = () => setEditModalOpen(false) // Đóng modal chỉnh sửa

  const handleConfirmDelete = () => {
    console.log(`Deleting request with id: ${request.requestId}`)
    closeModal()
  }

  const handleUpdate = (updatedRequest: Request) => {
    // Thực hiện lưu thông tin đã cập nhật
    console.log('Updated request: ', updatedRequest)
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(request.requestId)}>
            Copy request ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openEditModal}>Assign</DropdownMenuItem>{' '}
          {/* Khi nhấn "Assign", mở modal chỉnh sửa */}
          <DropdownMenuItem onClick={openModal}>Cancelled</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} />
      <EditRequestModal isOpen={isEditModalOpen} onClose={closeEditModal} request={request} onSave={handleUpdate} />
    </>
  )
}

export default RequestActions
