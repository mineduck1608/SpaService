import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import ProductActions from './productAction'
import { CosmeticProduct } from '@/types/type'

export const columns: ColumnDef<CosmeticProduct>[] = [
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
    accessorKey: 'productName',
    header: 'Product Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue<string>('quantity')
      return <div className='ml-12'>{value}</div>
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('status')
      const statusText = isActive ? 'Active' : 'Locked'
      const statusColor = isActive ? 'text-green-500' : 'text-red-500'
      return <span className={statusColor}>{statusText}</span>
    }
  },
  {
    accessorKey: 'isSelling',
    header: 'Is Selling',
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('isSelling')
      const statusText = isActive ? 'Active' : 'Locked'
      const statusColor = isActive ? 'text-green-500' : 'text-red-500'
      return <span className={statusColor}>{statusText}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original
      return <ProductActions product={product} />
    }
  }
]
