import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog'

import { Button } from '../../components/ui/button'
import { Appointment } from '@/types/type'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  data: Appointment
}
function tableData(appointment: Appointment) {
  return [
    { key: 'Service', value: appointment.request?.service?.serviceName },
    { key: 'Start Time', value: new Date(appointment.startTime).toLocaleString() },
    { key: 'End Time', value: new Date(appointment.endTime).toLocaleString() },
    {
      key: 'Status',
      value: appointment.status,
      color: new Map<string, string>([
        ['Done', 'text-green-500'],
        ['Pending', 'text-gray-500'],
        ['Cancelled', 'text-red-500']
      ])
    },
    { key: 'Requested Employee', value: appointment.employee?.fullName ?? 'Not assigned yet' },
    {
      key: 'Room number',
      value: appointment.room?.roomNum ?? 'Not assigned yet'
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
                  <tr key={v.key}>
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
