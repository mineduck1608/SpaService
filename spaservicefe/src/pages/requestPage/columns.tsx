import { ColumnDef } from '@tanstack/react-table'
import { SpaRequest } from '@/types/type' // Assuming `Request` is the correct type based on the entity
import { formatNumber } from '../servicesPage/servicesPage.util'
import Details from './details'
import { formatDate } from 'date-fns'
export const columns: ColumnDef<SpaRequest>[] = [
  {
    accessorKey: 'serviceName',
    header: 'Service',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Time',
    cell: (r) => formatDate(r.row.original.createdAt, 'dd/MM/yyyy hh:mm:ss')
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: (r) => formatDate(r.row.original.startTime, 'dd/MM/yyyy hh:mm')
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
      } else if (status === 'Denied') {
        statusColor = 'text-red-500'
      } else if (status === 'Pending') {
        statusColor = 'text-gray-500'
      }

      return <span className={statusColor}>{status}</span>
    }
  },
  {
    accessorKey: 'employeeName',
    header: 'Requested Employee'
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    cell: ({ row }) => {
      const totalPrice = row.getValue('totalPrice') ?? 0
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Details request={row.original} />
    }
  }
]
