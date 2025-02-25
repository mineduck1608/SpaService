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
import { Order } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import UpdateOrderModal from './orderUpdateModal'
import { ToastContainer } from 'react-toastify'
import { handleDelete } from './order.util'

interface OrderActionsProps {
  order: Order
}

const OrderActions: React.FC<OrderActionsProps> = ({ order }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => {
    setUpdateModalOpen(true)
  }
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const handleConfirmDelete = async () => {
    handleDelete(order.orderId)
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.orderId)}>
            {' '}
            Copy order ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>View Detail</DropdownMenuItem>
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
      <UpdateOrderModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} order={order} />
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default OrderActions
