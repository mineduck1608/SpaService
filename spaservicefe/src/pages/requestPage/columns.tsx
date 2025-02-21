import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { Request } from '@/types/type' // Assuming `Request` is the correct type based on the entity

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: 'serviceName',
    header: 'Service',
    cell: (r) => r.row.original.service?.serviceName
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: (r) => r.row.original.startTime
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
    accessorKey: 'customerNote',
    header: 'Customer Note',
    cell: ({ row }) => row.getValue('customerNote') || 'No notes provided'
  },
  {
    accessorKey: 'managerNote',
    header: 'Manager Note',
    cell: ({ row }) => row.getValue('managerNote') || 'No notes provided'
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const request = row.original
  //     return <RequestActions request={request} /> // Assuming this component handles the actions for the request
  //   }
  // }
]
