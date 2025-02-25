import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import ManagerActions from './managerAction'
import { Manager } from '@/types/type'

export const columns: ColumnDef<Manager>[] = [
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
    accessorKey: 'fullName',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Full Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => {
      const position = row.getValue<string>('position')
      return <span>{position}</span>
    }
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'hireDate',
    header: 'Hire Date'
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
    id: 'actions',
    cell: ({ row }) => {
      const manager = row.original
      return <ManagerActions manager={manager} />
    }
  }
]
