import { ColumnDef } from '@tanstack/react-table'
import { SessionItem } from '@/types/sessionItem'
import { formatNumber } from '../servicesPage/servicesPage.util'
import RowCheckBox, { AllRowCheckBox, AmountButton, RemoveButton } from './miscInputs'

export const columns: ColumnDef<SessionItem>[] = [
  {
    id: 'select',
    header: ({ table }) => <AllRowCheckBox table={table} />,
    cell: ({ row }) => <RowCheckBox row={row} />,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'productName',
    header: 'Product Name',
    cell: ({ row }) => row.original.product.productName
  },
  {
    accessorKey: 'product Image',
    header: 'Image',
    cell: ({ row }) => (
      <img
        src={row.original.product.image}
        alt={'Image of ' + row.original.product.productName}
        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
      />
    )
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => formatNumber(parseFloat(row.original.product.price.toFixed(2)))
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <AmountButton row={row} />
  },
  {
    accessorKey: 'Sub Total',
    header: 'Sub Total',
    cell: ({ row }) => formatNumber(parseFloat(row.original.product.price.toFixed(2)) * row.original.amount)
  },
  {
    accessorKey: 'other',
    header: '',
    cell: ({ row }) => <RemoveButton row={row} />
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const contact = row.original
  //     return <ContactActions contact={contact} /> // Assuming this component handles actions for the contact
  //   }
  // }
]
