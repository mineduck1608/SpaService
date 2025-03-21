import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../../components/ui/dialog'

import { Button } from '../../components/ui/button'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function SuccessModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Created!</DialogTitle>
          <DialogDescription className='flex justify-center'>You can continue or see your request!</DialogDescription>
        </DialogHeader>
        <div className='flex justify-evenly'>
          <Button onClick={onConfirm} className='bg-purple1'>
            Confirm
          </Button>
          <Button onClick={() => {
            window.location.assign('requests')
          }} className='bg-purple1'>
            View your requests
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
