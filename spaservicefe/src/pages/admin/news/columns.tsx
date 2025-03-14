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
    accessorKey: 'categoryName',
    header: 'Category'
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
    },
    cell: ({ row }) => {
      const value = row.getValue<string>('type')
      return <div className='ml-7'>{value}</div>
    }
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('image')
      return imageUrl ? (
        <img src={imageUrl} alt='News' className='h-[100px] w-[300px] rounded object-cover' />
      ) : (
        <span>No Image</span>
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
