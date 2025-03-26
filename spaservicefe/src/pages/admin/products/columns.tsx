import { ColumnDef } from '@tanstack/react-table'
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
        <span
          className={`${status ? 'text-green-500' : 'text-red-500'}`}
          style={{ whiteSpace: 'nowrap' }} // Giữ nội dung trên cùng một dòng
        >
          {status ? 'Available' : 'Sold Out'}
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
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('image') // Lấy URL hình ảnh từ dữ liệu
      return imageUrl ? (
        <img
          src={imageUrl}
          alt='News'
          className='h-[100px] w-[500px] rounded object-cover' // Sử dụng chiều rộng và chiều cao cố định, có thể tùy chỉnh
        />
      ) : (
        <span>No Image</span> // Nếu không có URL hình ảnh, hiển thị "No Image"
      )
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
