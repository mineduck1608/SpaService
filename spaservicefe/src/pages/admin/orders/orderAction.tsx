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
import { Order } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import { handleDelete } from './order.util'
import { toast } from 'react-toastify'
import DetailOrderModal from './orderDetailModal'
import { updateOrderStatus } from './order.util'

interface OrderActionsProps {
  order: Order
}

const OrderActions: React.FC<OrderActionsProps> = ({ order }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const openDetailModal = () => setDetailModalOpen(true)
  const closeDetailModal = () => setDetailModalOpen(false)

  const handleConfirmDelete = async () => {
    handleDelete(order.orderId)
    closeDeleteModal()
  }

  const confirmOrder = async () => {
    try {
      const response = await updateOrderStatus(order.orderId)

      if (response && response.msg) {
        toast.success(response.msg, { containerId: 'toast' })
        setTimeout(() => window.location.reload(), 2000)
      } else {
        toast.error('Failed to confirm the order.', { containerId: 'toast' })
      }
    } catch (error) {
      toast.error('Error occurred while confirming the order.', { containerId: 'toast' })
    }
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
            Copy order ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openDetailModal} className='cursor-pointer'>
            View Detail
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>Update</DropdownMenuItem> */}
          <DropdownMenuItem onClick={confirmOrder} className='cursor-pointer'>
            Confirm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DetailOrderModal isOpen={isDetailModalOpen} onClose={closeDetailModal} order={order} />
      {/* <UpdateOrderModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} order={order} /> */}
      {/* <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} /> */}
    </>
  )
}

export default OrderActions
