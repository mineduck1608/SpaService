import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { GuestApplication } from '@/types/type'
import { format } from 'date-fns'

// Format function for dates
const formatDate = (date: string | null) => {
  if (!date) return 'Unknown'
  const parsedDate = new Date(date)
  return format(parsedDate, 'dd:MM:yyyy HH:mm:ss')
}

// Conditional rendering for status colors
const getStatusStyle = (status: string | null) => {
  if (!status) return 'text-gray-500'
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-gray-500'
    case 'accepted':
      return 'text-green-500'
    case 'denied':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export const columns: ColumnDef<GuestApplication>[] = [
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
    accessorKey: 'content',
    header: 'Content',
    cell: ({ getValue }) => getValue() || 'Unknown'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string | null
      return <span className={getStatusStyle(status)}>{status || 'Unknown'}</span>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) => {
      const date = getValue() as string | null
      return formatDate(date)
    }
  },
  {
    accessorKey: 'resolvedBy',
    header: 'Resolved By',
    cell: ({ getValue }) => getValue() || 'Unknown'
  },
  {
    accessorKey: 'resolvedAt',
    header: 'Resolved At',
    cell: ({ getValue }) => {
      const date = getValue() as string | null
      return formatDate(date)
    }
  }
]
