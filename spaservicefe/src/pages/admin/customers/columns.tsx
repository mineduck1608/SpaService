import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import CustomerActions from './customerAction'
import { Customer } from '@/types/type'

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => {
      const gender = row.getValue<string>('gender')
      return <span>{gender}</span>
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
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => {
      const dateOfBirth = row.getValue<Date>('dateOfBirth')
      return <span>{new Date(dateOfBirth).toLocaleDateString()}</span>
    }
  },
  {
    accessorKey: 'type',
    header: 'Membership'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original
      return <CustomerActions customer={customer} />
    }
  }
]
