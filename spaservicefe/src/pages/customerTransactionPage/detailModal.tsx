import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../../components/ui/dialog'

import { Button } from '../../components/ui/button'
import { SpaRequest, TransactionBase } from '@/types/type'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { status } from './customerTransPage.util'
import { Transaction } from '../checkout/checkoutPage.util'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  data: TransactionBase
}
export function DetailModal({ isOpen, onClose, onConfirm, data }: ConfirmDeleteModalProps) {
  const products = data.cosmeticTransactions[0].order.orderDetails
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Detail</DialogTitle>
          <DialogDescription className='flex justify-center'>
            <table className='w-full border-[1px] text-black'>
              <thead>
                <tr className='text-md bg-purple1 font-bold text-white *:p-1'>
                  <td>Product name</td>
                  <td>Price per item</td>
                  <td>Quantity</td>
                  <td>Sub Total</td>
                </tr>
              </thead>
              <tbody>
                {products.map((v) => (
                  <tr>
                    <td className='p-2'>{v.product.productName}</td>
                    <td>{formatNumber(v.subTotalAmount / v.quantity)}</td>
                    <td>{v.quantity}</td>
                    <td>{formatNumber(v.subTotalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onConfirm} className='bg-purple1'>
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  )
}
