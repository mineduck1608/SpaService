import { ColumnDef } from '@tanstack/react-table'
import { Order } from '@/types/type'
import { formatDate } from 'date-fns'
import OrderActions from './orderAction'
import { formatNumber } from 'src/pages/servicesPage/servicesPage.util'

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
    cell: (r) => formatDate(r.row.original.orderDate, 'dd/MM/yyyy hh:mm')
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => {
      const totalAmount = row.getValue('totalAmount') ?? 0
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)
    }
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'recepientName',
    header: 'Cashier',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original
      return <OrderActions order={order} />
    }
  }
]
