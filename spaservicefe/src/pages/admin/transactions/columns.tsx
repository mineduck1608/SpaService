import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Checkbox } from '../../../components/ui/checkbox'
import TransactionActions from './transactionAction'
import { TransactionBase } from '@/types/type'

export const columns: ColumnDef<TransactionBase>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'transactionType',
    header: 'Transaction Type'
  },
  {
    accessorKey: 'paymentType',
    header: 'Payment Type'
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    cell: ({ row }) => {
      const price = row.getValue('totalPrice')
      // Định dạng giá trị thành tiền VND
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
      
      return <span>{formattedPrice}</span>
    }
  },
  {
    accessorKey: 'completeTime',
    header: 'Complete Time'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      const statusText = status ? 'Done' : 'Unfinished'
      const statusColor = status ? 'text-green-500' : 'text-red-500'
      return <span className={statusColor}>{statusText}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transaction = row.original
      return <TransactionActions transaction={transaction} />
    }
  }
]
