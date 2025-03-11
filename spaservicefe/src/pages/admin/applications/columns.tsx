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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      const statusColor = status === 'Resolved' ? 'text-green-500' : 'text-red-500'
      return <span className={statusColor}>{status}</span>
    }
  },
  {
    accessorKey: 'content',
    header: 'Content'
  },
  {
    accessorKey: 'createBy',
    header: 'Created By'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    accessorKey: 'resolvedAt',
    header: 'Resolved At',
    cell: ({ row }) => (row.original.resolvedAt ? row.original.resolvedAt : 'N/A')
  },
  {
    accessorKey: 'managerName',
    header: 'Resolved By'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const application = row.original
      return <ApplicationActions application={application} />
    }
  }
]
