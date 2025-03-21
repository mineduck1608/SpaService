import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../../components/ui/dialog'

import { Button } from '../../components/ui/button'
import { SpaRequest } from '@/types/type'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { status } from './requestPage.util'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  data: SpaRequest
}
function tableData(request: any) {
  return [
    { key: 'Service', value: request.serviceName },
    { key: 'Start Time', value: new Date(request.startTime).toLocaleString() },
    {
      key: 'Request Status',
      value: request.status,
      color: new Map<string, string>([
        ['Processed', 'text-green-500'],
        ['Pending', 'text-gray-500'],
        ['Denied', 'text-red-500']
      ])
    },
    { key: 'Requested Employee', value: request.employeeName ?? 'Did not request' },
    { key: "Manager's Note", value: request.managerNote ?? 'None' },
    { key: 'Your Note', value: request.customerNote.length === 0 ? 'None' : request.customerNote },
    {
      key: 'Price',
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
        request.totalPrice ?? 0
      )
    },
    {
      key: 'Transaction Status',
      value: status(request.transactionStatus ?? false),
      color: new Map<string, string>([
        ['Completed', 'text-green-500'],
        ['Not Completed', 'text-red-500']
      ])
    }
  ]
}
export function DetailModal({ isOpen, onClose, onConfirm, data }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Detail</DialogTitle>
          <DialogDescription className='flex justify-center'>
            <table className='w-full border-[1px] text-black'>
              <tbody>
                {tableData(data).map((v) => (
                  <tr>
                    <td className='p-2'>{v.key}</td>
                    <td className={`${v.color ? v.color.get(v.value) : ''}`}>{v.value}</td>
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
