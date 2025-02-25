import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { CategoryEmployee  } from '@/types/type'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import EmployeeCategoryActions from './employeeCategoryAction'

export const columns: ColumnDef<CategoryEmployee>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'categoryName',
    header: 'Service Category'
  },
  {
    accessorKey: 'employeeName',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Employee
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original
      return <EmployeeCategoryActions employeeCategory={product} /> // Assuming you have a ProductActions component for actions
    }
  }
]
