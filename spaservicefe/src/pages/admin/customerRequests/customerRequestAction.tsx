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
import { SpaRequest } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import { EditRequestModal } from './editRequestModal'

interface RequestActionsProps {
  request: SpaRequest
}

const RequestActions: React.FC<RequestActionsProps> = ({ request }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const openEditModal = () => setEditModalOpen(true)
  const closeEditModal = () => setEditModalOpen(false)

  const handleConfirmDelete = () => {
    console.log(`Deleting request with id: ${request.requestId}`)
    closeModal()
  }

  const handleUpdate = (updatedRequest: SpaRequest) => {
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
          <DropdownMenuItem onClick={openEditModal}>Assign</DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>Cancelled</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} />
      <EditRequestModal isOpen={isEditModalOpen} onClose={closeEditModal} request={request} onSave={handleUpdate} />
    </>
  )
}

export default RequestActions
