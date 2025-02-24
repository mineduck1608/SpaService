import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import { Floor } from '@/types/type' // Use Floor type instead of News
import FloorAction from './floorAction' // Assuming you have a FloorAction component for actions

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
    accessorKey: 'floorId', // Display floorId
    header: 'Floor ID'
  },
  {
    accessorKey: 'floorNum', // Display floor number
    header: 'Floor'
  },
  {
    accessorKey: 'categoryName', // Display category name
    header: 'Category'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const floor = row.original
      return <FloorAction floor={floor} /> // Assuming FloorAction component exists
    }
  }
]
