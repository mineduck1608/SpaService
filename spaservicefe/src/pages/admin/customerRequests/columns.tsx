import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import RequestActions from './customerRequestAction' // Updated to reflect customer request actions
import { Request } from '@/types/type' // Assuming `Request` is the correct type based on the entity

export const columns: ColumnDef<Request>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'customerName',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Customer
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'serviceName',
    header: 'Service',
    cell: ({ row }) => row.getValue('serviceName')
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ row }) => row.getValue('startTime')

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
  {
    id: 'actions',
    cell: ({ row }) => {
      const request = row.original
      return <RequestActions request={request} /> // Assuming this component handles the actions for the request
    }
  }
]
