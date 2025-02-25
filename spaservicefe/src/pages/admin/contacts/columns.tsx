import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import ContactActions from './contactAction' // Assuming updated actions for contacts
import { Contact } from '@/types/type' // Assuming `Contact` is the correct type based on the entity

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: 'contactId',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Contact ID
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: ({ row }) => row.getValue('fullName')
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => row.getValue('phoneNumber')
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.getValue('email')
  },
  {
    accessorKey: 'contactContent',
    header: 'Contact Content',
    cell: ({ row }) => row.getValue('contactContent') || 'No content provided'
  },
  {
    accessorKey: 'isProcessed',
    header: 'Processed',
    cell: ({ row }) => {
      const isProcessed = row.getValue<boolean>('isProcessed')
      const processedColor = isProcessed ? 'text-green-500' : 'text-red-500'
      return <span className={processedColor}>{isProcessed ? 'Yes' : 'No'}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const contact = row.original
      return <ContactActions contact={contact} /> // Assuming this component handles actions for the contact
    }
  }
]
