import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { CosmeticProduct } from '@/types/type'
import CosmeticActions from './cosmeticAction'

export const columns: ColumnDef<CosmeticProduct>[] = [
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
    accessorKey: 'productName',
    header: 'Product Name'
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = row.getValue('price')
      // Định dạng giá trị thành tiền VND
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
      const status = row.getValue('status');
      return (
        <span
          className={`font-semibold ${status ? 'text-green-500' : 'text-red-500'}`}
        >
          {status ? 'On Stock' : 'Out of Stock'}
        </span>
      );
    }
  },  
  {
    accessorKey: 'isSelling',
    header: 'Is selling',
    cell: ({ row }) => (row.getValue('isSelling') ? 'Yes' : 'No') // Show availability status
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original
      return <CosmeticActions cosmetic={product} /> // Assuming you have a ProductActions component for actions
    }
  }
]
