import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import PromotionActions from './promotionAction'
import { Promotion } from '@/types/type'

export const columns: ColumnDef<Promotion>[] = [
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
    accessorKey: 'promotionCode',
    header: 'Promotion Code'
  },
  {
    accessorKey: 'promotionName',
    header: 'Promotion Name'
  },
  {
    accessorKey: 'discountValue',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Discount Value
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue<string>('discountValue')
      return <div className='ml-16'>{value}</div>
    }
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('isActive')
      const statusText = isActive ? 'Available' : 'Unavailable'
      const statusColor = isActive ? 'text-green-500' : 'text-red-500'
      return <span className={statusColor}>{statusText}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const promotion = row.original
      return <PromotionActions promotion={promotion} />
    }
  }
]
