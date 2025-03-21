import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ToastContainer } from 'react-toastify'
import { TransactionDetailTable } from './transactionDetailTable'

interface DetailTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: any
}

export default function DetailTransactionModal({ isOpen, onClose, transaction }: DetailTransactionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10 font-montserrat'>
        <DialogTitle className='flex justify-center'>Transaction Detail</DialogTitle>
        <TransactionDetailTable
          transactionId={transaction.transactionId}
          transactionType={transaction.transactionType}
        />
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
