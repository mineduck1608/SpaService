import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import OrderStatus from './orderStatus'
import { OrderDetailTable } from 'src/pages/admin/orders/orderDetailTable'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
}

export default function OrderStatusModal({ isOpen, onClose, order }: OrderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='mx-auto max-h-[90vh] w-[1200px] max-w-3xl font-montserrat'>
        <DialogTitle className='flex justify-center'>Order Detail</DialogTitle>
        <OrderStatus order={order} /> 
        <OrderDetailTable orderId={order.orderId} />
      </DialogContent>
    </Dialog>
  )
}
