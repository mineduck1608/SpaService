import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu'
import { Order } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import OrderStatusModal from './orderStatusModal'

interface OrderActionsProps {
  order: Order
}

const OrderActions: React.FC<OrderActionsProps> = ({ order }) => {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)

  const openDetailModal = () => setDetailModalOpen(true)
  const closeDetailModal = () => setDetailModalOpen(false)

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
          <DropdownMenuItem onClick={openDetailModal} className='cursor-pointer'>
            View Detail
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <OrderStatusModal isOpen={isDetailModalOpen} onClose={closeDetailModal} order={order} />
    </>
  )
}

export default OrderActions
