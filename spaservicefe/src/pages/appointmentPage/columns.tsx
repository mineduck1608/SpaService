import { ColumnDef } from '@tanstack/react-table'
import { Appointment, SpaRequest } from '@/types/type' // Assuming `Request` is the correct type based on the entity
import { formatNumber } from '../servicesPage/servicesPage.util'
import Details from './details'
export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'service',
    header: 'Service',
    cell: (r) => r.row.original.request?.service?.serviceName
  },
  {
    accessorKey: 'start',
    header: 'Start Time',
    cell: (r) => new Date(r.row.original.startTime).toLocaleString()
  },
  {
    accessorKey: 'end',
    header: 'End Time',
    cell: (r) => new Date(r.row.original.endTime).toLocaleString()
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      let statusColor = ''
      // Set the color based on the status value
      if (status === 'Completed') {
        statusColor = 'text-green-500'
      } else if (status === 'Cancelled') {
        statusColor = 'text-red-500'
      } else if (status === 'Pending') {
        statusColor = 'text-gray-500'
      }

      return <span className={statusColor}>{status}</span>
    }
  },
  {
    accessorKey: 'requestedId',
    header: 'Responsible Employee',
    cell: (r) => r.row.original.employee?.fullName ?? 'Not assigned yet'
  },
  {
    accessorKey: 'requestedId',
    header: 'Room number',
    cell: (r) => r.row.original.room?.roomNum ?? 'Not assigned yet'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Details request={row.original}/>
    }
  }
]
