import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { Room } from '@/types/type' // Use Floor type instead of News
import RoomActions from './roomAction'

export const columns: ColumnDef<Room>[] = [
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
    accessorKey: 'roomNum',
    header: 'Room Number'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (row.getValue('status') ? 'Available' : 'Occupied')
  },
  {
    accessorKey: 'floorName',
    header: 'Floor'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const room = row.original
      return <RoomActions room={room} />
    }
  }
]
