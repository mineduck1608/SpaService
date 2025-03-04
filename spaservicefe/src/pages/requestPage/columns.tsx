import { ColumnDef } from '@tanstack/react-table'
import { SpaRequest } from '@/types/type' // Assuming `Request` is the correct type based on the entity
import { formatNumber } from '../servicesPage/servicesPage.util'
import Details from './details'
export const columns: ColumnDef<SpaRequest>[] = [
  {
    accessorKey: 'serviceName',
    header: 'Service',
    cell: (r) => r.row.original.service?.serviceName
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: (r) => new Date(r.row.original.startTime).toLocaleString()
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
    header: 'Requested Employee',
    cell: (r) => r.row.original.employee?.fullName ?? 'Did not request'
  },
  {
    accessorKey: 'price',
    header: 'Total Price',
    cell: (r) => {
      const transaction = r.row.original.serviceTransactions?.[0]?.transaction;
      const totalPrice = transaction?.totalPrice ?? 0;
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    }
  },   
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Details request={row.original} />
    }
  }
]
