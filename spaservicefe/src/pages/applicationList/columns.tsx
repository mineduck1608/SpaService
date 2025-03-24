import { ColumnDef } from '@tanstack/react-table'
import { Application } from '@/types/type' // Assuming `Request` is the correct type based on the entity
import { formatDate } from 'date-fns'
export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: 'time',
    header: 'Created At',
    cell: (r) => formatDate(r.row.original.createdAt, 'dd/MM/yyyy hh:mm')
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      let statusColor = ''
      // Set the color based on the status value
      if (status === 'Resolved') {
        statusColor = 'text-green-500'
      } else if (status === 'Rejected') {
        statusColor = 'text-red-500'
      } else if (status === 'Pending') {
        statusColor = 'text-gray-500'
      }

      return <span className={statusColor}>{status}</span>
    }
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: (r) => r.row.original.content
  },
  {
    accessorKey: 'managerNote',
    header: 'Result',
    cell: (r) => 'YE'
  }
]
