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
    header: 'Price',
    cell: ({ row }) => {
      const price = row.getValue('price')
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)

      return <span>{formattedPrice}</span>
    }
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status')
      return (
        <span className={`font-semibold ${status ? 'text-green-500' : 'text-red-500'}`}>
          {status ? 'On Stock' : 'Out of Stock'}
        </span>
      )
    }
  },
  {
    accessorKey: 'isSelling',
    header: 'Is Selling?',
    cell: ({ row }) => (row.getValue('isSelling') ? 'Yes' : 'No')
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original
      return <ProductActions product={product} />
    }
  }
]
