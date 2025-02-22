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

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  data: SpaRequest
}
function tableData(request: SpaRequest) {
  return [
    { key: 'Service', value: request.service?.serviceName },
    { key: 'Start Time', value: request.startTime },
    { key: 'Requested Employee', value: request.employee?.fullName ?? 'Did not request' },
    { key: "Manager's note", value: request.managerNote ?? 'None' },
    { key: 'Your note', value: request.customerNote ?? 'None' },
    { key: 'Price', value: formatNumber(request.service?.price ?? 0) },
    { key: 'Transaction Status', value: 'TBA' }
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
                    <td>{v.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogContent>
    </Dialog>
  )
}
