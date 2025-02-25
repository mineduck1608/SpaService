import { ColumnDef } from '@tanstack/react-table'
import { SessionItem } from '@/types/sessionItem'
import RowCheck, { CheckAll } from './check'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { Checkbox } from '../../components/ui/checkbox'

export const columns: ColumnDef<SessionItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value: boolean) => {
          table.toggleAllPageRowsSelected(value)
        }}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        defaultChecked={true}
        onCheckedChange={(value: boolean) => {
          row.toggleSelected(value)
        }}
        aria-label='Select row'
      />
    ),
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
    cell: ({ row }) => <img src={row.original.product.image} alt={'Image of ' + row.original.product.productName} />
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => parseFloat(row.original.product.price.toFixed(2))
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => row.original.amount
  },
  {
    accessorKey: 'Sub Total',
    header: 'Sub Total',
    cell: ({ row }) => formatNumber(parseFloat(row.original.product.price.toFixed(2)) * row.original.amount)
  },
  {
    accessorKey: 'checked',
    header: 'Sub Total',
    cell: ({ row }) => (row.original.include ? 'True' : 'False')
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const contact = row.original
  //     return <ContactActions contact={contact} /> // Assuming this component handles actions for the contact
  //   }
  // }
]
