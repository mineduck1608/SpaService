import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { Floor } from '@/types/type'
import FloorAction from './floorAction'

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
    accessorKey: 'floorId',
    header: 'Floor ID'
  },
  {
    accessorKey: 'floorNum',
    header: 'Floor'
  },
  {
    accessorKey: 'categoryName',
    header: 'Category'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const floor = row.original
      return <FloorAction floor={floor} />
    }
  }
]
