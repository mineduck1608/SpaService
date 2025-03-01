import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import RequestActions from './customerRequestAction'
import { SpaRequest } from '@/types/type'

export const columns: ColumnDef<SpaRequest>[] = [
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
    accessorKey: 'employeeName',
    header: 'Employee',
    cell: ({ row }) => row.getValue('employeeName')
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ row }) => row.getValue('startTime')
  },
  
  {
    accessorKey: 'createdAt',
    header: 'Create At',
    cell: ({ row }) => row.getValue('createdAt')
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      let statusColor = ''
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
