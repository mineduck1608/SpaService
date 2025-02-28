import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ToastContainer } from 'react-toastify'
import { OrderDetailTable } from './orderDetailTable'

interface DetailOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
}

export default function DetailOrderModal({ isOpen, onClose, order }: DetailOrderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Order Detail</DialogTitle>
        <OrderDetailTable orderId={order.orderId} />
      </DialogContent>
    </Dialog>
  )
}
