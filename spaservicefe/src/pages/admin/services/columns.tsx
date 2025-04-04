import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { SpaService } from '@/types/type'
import ServiceAction from './serviceAction'

export const columns: ColumnDef<SpaService>[] = [
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
    accessorKey: 'serviceName',
    header: 'Service Name'
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
    accessorKey: 'duration',
    header: 'Duration'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'serviceImage',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('serviceImage') // Lấy URL hình ảnh từ dữ liệu
      return imageUrl ? (
        <img
          src={imageUrl}
          alt='News'
          className='h-[100px] w-[200px] rounded object-cover' // Sử dụng chiều rộng và chiều cao cố định, có thể tùy chỉnh
        />
      ) : (
        <span>No Image</span> // Nếu không có URL hình ảnh, hiển thị "No Image"
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const service = row.original
      return <ServiceAction service={service} />
    }
  }
]
