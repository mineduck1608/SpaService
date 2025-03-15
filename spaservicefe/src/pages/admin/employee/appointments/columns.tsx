import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/checkbox'
import { Appointment } from '@/types/type'
import { ArrowUpDown } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import AppointmentActions from './appointmentAction'

export const columns: ColumnDef<Appointment>[] = [
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
    accessorKey: 'roomNumber',
    header: 'Room'
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time'
  },
  {
    accessorKey: 'endTime',
    header: 'End Time'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue().toLowerCase()
      let textColor = 'black'
      if (status === 'pending') {
        textColor = 'gray'
      } else if (status === 'processing') {
        textColor = 'blue'
      } else if (status === 'finished') {
        textColor = 'green'
      } else if (status === 'not proccessed') {
        textColor = 'red'
      }

      return <span style={{ color: textColor }}>{info.getValue()}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const appointment = row.original
      return <AppointmentActions appointment={appointment} />
    }
  }
]
