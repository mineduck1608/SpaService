import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import AccountActions from './accountActions'
import { Account } from '@/types/type'

export const columns: ColumnDef<Account>[] = [
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
    accessorKey: 'username',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Username
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
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
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At'
  },
  {
    accessorKey: 'roleName',
    header: 'Role'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const account = row.original
      return <AccountActions account={account} />
    }
  }
]
