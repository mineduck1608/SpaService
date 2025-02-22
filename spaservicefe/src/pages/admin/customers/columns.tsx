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
    header: 'Membership',
    cell: ({ row }) => {
      const type = row.getValue<string>('type')
      let typeColor = ''

      // Set the color based on the type value
      switch (type) {
        case 'Gold':
          typeColor = 'text-yellow-500' // Gold color (yellow)
          break
        case 'Silver':
          typeColor = 'text-gray-500' // Silver color (gray)
          break
        case 'Platinum':
          typeColor = 'text-blue-500' // Platinum color (blue)
          break
        case 'Diamond':
          typeColor = 'text-indigo-500' // Diamond color (indigo)
          break
        default:
          typeColor = 'text-gray-400' // Default color for any unrecognized type
      }

      return <span className={typeColor}>{type}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original
      return <CustomerActions customer={customer} />
    }
  }
]
