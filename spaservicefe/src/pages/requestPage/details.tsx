import { useState } from 'react'
import { Button } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu'
import { ConfirmDeleteModal } from '../admin/components/deleteModal'
import { SpaRequest } from '@/types/type' // Đổi từ Account sang Request
import { MoreHorizontal } from 'lucide-react'
import { EditRequestModal } from '../admin/customerRequests/editRequestModal' // Import modal chỉnh sửa yêu cầu
import { DetailModal } from './detailModal'

interface RequestActionsProps {
  request: SpaRequest // Cập nhật type từ Account thành Request
}

const Details: React.FC<RequestActionsProps> = ({ request }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const closeModal = () => setModalOpen(false)

  const handleConfirmDelete = () => {
    closeModal()
  }

  return (
    <div>
      <button className='bg-blue-600 p-2 rounded-md text-white hover:bg-blue-500' onClick={(e) => {setModalOpen(true)}}>View Detail</button>
      <DetailModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} data={request}/>
    </div>
  )
}

export default Details
