import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { Floor } from '@/types/type'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';



export const columns: ColumnDef<Floor>[] = [
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
    accessorKey: 'customerName',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Customer
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'serviceName',
    header: 'Service'
  },
  {
    accessorKey: 'feedbackMessage',
    header: 'Message'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  

  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: info => {
      const rating = info.getValue();
      const fullStars = Math.floor(rating);
      const halfStars = rating % 1 !== 0;
      const emptyStars = 5 - Math.ceil(rating);
  
      const stars = [
        ...Array(fullStars).fill(<FaStar color="gold" />),
        ...(halfStars ? [<FaStarHalfAlt color="gold" />] : []),
        ...Array(emptyStars).fill(<FaRegStar color="silver" />)
      ];
  
      return <div style={{ display: 'flex', gap: '2px' }}>{stars}</div>;
    }
  }

]
