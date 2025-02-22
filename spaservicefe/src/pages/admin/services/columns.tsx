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
    header: 'Price'
  },
  {
    accessorKey: 'duration',
    header: 'Duration'
  },
  {
    accessorKey: 'noOfSessions',
    header: 'No Of Sessions'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const service = row.original
      return <ServiceAction service={service} />
    }
  }
]
