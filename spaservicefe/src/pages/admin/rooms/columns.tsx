import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../../../components/ui/checkbox'
import { Room } from '@/types/type'
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
    accessorKey: 'roomId',
    header: 'Room ID'
  },
  {
    accessorKey: 'floorNum',
    header: 'Floor'
  },
  {
    accessorKey: 'roomNum',
    header: 'Room Number'
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
