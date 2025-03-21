import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { OrderDetailTable } from './orderDetailTable'
import OrderStatus from './orderStatus'

interface DetailOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
}

export default function DetailOrderModal({ isOpen, onClose, order }: DetailOrderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='mx-auto max-h-[90vh] w-[650px] max-w-2xl font-montserrat'>
        <DialogTitle className='flex justify-center'>Order Detail</DialogTitle>
        <OrderStatus order={order} /> 
        <OrderDetailTable orderId={order.orderId} />
      </DialogContent>
    </Dialog>
  )
}
