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
import { ToastContainer, toast } from 'react-toastify'
import UpdateOrderModal from './orderDetailModal'
import { UpdateOrderStatus } from './order.util' // Import the function

interface OrderActionsProps {
  order: Order
}

const OrderActions: React.FC<OrderActionsProps> = ({ order }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const confirmOrder = async () => {
    try {
      const response = await UpdateOrderStatus(order.orderId)

      // If the response is successful, show success toast
      if (response && response.msg) {
        toast.success(response.msg) // Show the msg from the response as a success toast
        window.location.reload()
      } else {
        toast.error('Failed to confirm the order.')
      }
    } catch (error) {
      toast.error('Error occurred while confirming the order.')
    }
  }
  console.log(order.status)
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.orderId)}>Copy OrderID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            View Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={confirmOrder} className='cursor-pointer'>
            Confirm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />

      <UpdateOrderModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} order={order} />
    </>
  )
}

export default OrderActions
