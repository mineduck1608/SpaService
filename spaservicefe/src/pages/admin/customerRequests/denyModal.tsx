import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../../../components/ui/dialog'

import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (managerNote: string) => void
}

export function ConfirmDenyModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
  const [managerNote, setManagerNote] = useState('')

  const handleConfirm = () => {
    if (!managerNote.trim()) {
      alert('Please provide a reason for declining.')
      return
    }
    onConfirm(managerNote)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. Please provide a reason before declining.</DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder='Enter your note here...'
          value={managerNote}
          onChange={(e) => setManagerNote(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={onClose} variant='default'>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant='destructive'>
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
