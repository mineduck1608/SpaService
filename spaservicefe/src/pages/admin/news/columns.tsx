import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import { News } from '@/types/type'
import NewsAction from './newAction'

export const columns: ColumnDef<News>[] = [
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
    accessorKey: 'header',
    header: 'Header'
  },
  {
    accessorKey: 'content',
    header: 'Content'
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'categoryName',
    header: 'Category'
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
      const news = row.original
      return <NewsAction news={news} />
    }
  }
]
