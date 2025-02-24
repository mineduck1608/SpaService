import React, { useEffect } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { FieldConfig, generateZodSchema } from '../modal.util'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ToastContainer } from 'react-toastify'
import { ordersConfig } from '../modal.util'
import { OrderDetailTable } from './orderDetailTable'

interface UpdateOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
}

export default function UpdateOrderModal({ isOpen, onClose, order }: UpdateOrderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        {' '}
        {/* Set width to 80% of the viewport width */}
        <DialogTitle className='flex justify-center'>Order Detail</DialogTitle>
        <OrderDetailTable orderId={order.orderId} />
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
