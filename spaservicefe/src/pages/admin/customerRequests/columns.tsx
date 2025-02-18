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
    accessorKey: 'requestId',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Request ID
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ row }) => {
      const startTime = new Date(row.getValue('startTime')).toLocaleString()
      return <span>{startTime}</span>
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      const statusColor = status === 'Active' ? 'text-green-500' : 'text-red-500'
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
    accessorKey: 'serviceId',
    header: 'Service ID',
    cell: ({ row }) => row.getValue('serviceId')
  },
  {
    accessorKey: 'customerId',
    header: 'Customer ID',
    cell: ({ row }) => row.getValue('customerId')
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const request = row.original
      return <RequestActions request={request} /> // Assuming this component handles the actions for the request
    }
  }
]
