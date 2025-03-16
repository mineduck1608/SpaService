import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'src/components/ui/checkbox'
import { EmployeeCommission } from '@/types/type'
import { ArrowUpDown } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import AppointmentActions from './commissionAction'

export const columns: ColumnDef<EmployeeCommission>[] = [
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
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'commissionValue',
    header: 'Commission Value',
    cell: ({ row }) => {
      const commissionValue = row.original.commissionValue
      return commissionValue !== 0
        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(commissionValue)
        : 'N/A'
    },
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
      const commission = row.original
      return <AppointmentActions commission={commission} />
    }
  }
]
