import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import ApplicationActions from './applicationAction'
import { Application } from '@/types/type'

export const columns: ColumnDef<Application>[] = [
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
    accessorKey: 'createBy',
    header: 'Created By'
  },
  {
    accessorKey: 'roleName',
    header: 'Role'
  },
  {
    accessorKey: 'content',
    header: 'Content'
  },
  
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      const statusColor = 
      status === 'Accepted' ? 'text-green-500' :
      status === 'Pending' ? 'text-gray-500' :
      status === 'Denied' ? 'text-red-500' :
      'text-black'; // Default color if the status doesn't match
          return <span className={statusColor}>{status}</span>
    }
  },
  {
    accessorKey: 'resolvedAt',
    header: 'Resolved At',
    cell: ({ row }) => (row.original.resolvedAt ? row.original.resolvedAt : 'N/A')
  },
  {
    accessorKey: 'resolvedBy',
    header: 'Resolved By'
  },
  {
    accessorKey: 'managerNote',
    header: 'Manager Note',
    cell: ({ row }) => (row.original.managerNote ? row.original.managerNote : 'N/A')
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const application = row.original
      return <ApplicationActions application={application} />
    }
  }
]
