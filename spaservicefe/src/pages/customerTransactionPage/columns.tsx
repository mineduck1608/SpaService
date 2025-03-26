import { ColumnDef } from '@tanstack/react-table'
import { TransactionBase } from '@/types/type' // Assuming `Request` is the correct type based on the entity
import { formatNumber } from '../servicesPage/servicesPage.util'
import Details from './details'
import { formatDate } from 'date-fns'
export const columns: ColumnDef<TransactionBase>[] = [
  {
    accessorKey: 'complete',
    header: 'Complete Time',
    cell: ({ row }) => {
      const status = row.original.completeTime
      let statusColor = ''
      // Set the color based on the status value
      if (status) {
        statusColor = ''
      } else {
        statusColor = 'text-red-500'
      }

      return <span className={statusColor}>{status ? formatDate(status, 'dd/MM/yyyy hh:mm') : 'Not Completed'}</span>
    }
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (r) => formatNumber(r.row.original.totalPrice)
  },
  {
    accessorKey: 'paymentType',
    header: 'Payment type',
    cell: (r) => r.row.original.paymentType
  },
  {
    accessorKey: 'promotion',
    header: 'Used Promotion',
    cell: (r) => (
      <>
        {r.row.original.promotion ? (
          <p>
            {r.row.original.promotion?.promotionCode} (-{r.row.original.promotion.discountValue}%)
          </p>
        ) : (
          <p>None</p>
        )}
      </>
    )
  }
]

export const columnsForService: ColumnDef<TransactionBase>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (r) => formatDate(r.row.original.serviceTransactions[0].request?.createdAt ?? '', 'dd/MM/yyyy hh:mm')
  },
  ...columns,
  {
    accessorKey: 'service',
    header: 'Service',
    cell: (r) => r.row.original.serviceTransactions[0].request?.service?.serviceName
  }
]
export const columnsForProduct: ColumnDef<TransactionBase>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (r) => formatDate(r.row.original.cosmeticTransactions[0].order?.orderDate ?? '', 'dd/MM/yyyy hh:mm')
  },
  ...columns,
  {
    accessorKey: 'detail',
    header: 'Detail',
    cell: (r) => <Details request={r.row.original} />
  }
]
