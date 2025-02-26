import { ColumnDef } from '@tanstack/react-table'
import { SessionItem } from '@/types/sessionItem'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { Checkbox } from '../../components/ui/checkbox'
import { getCart, getCartItem, removeCartItem, setCart, setCartItem } from '../cosmeticDetailPage/detailPage.util'
import RowCheckBox, { AllRowCheckBox } from './checkboxes'

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
    cell: ({ row }) => <img src={row.original.product.image} alt={'Image of ' + row.original.product.productName} />
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => formatNumber(parseFloat(row.original.product.price.toFixed(2)))
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
    accessorKey: 'other',
    header: '',
    cell: ({ row }) => (
      <button
        className='rounded-sm bg-purple1 p-2 text-white'
        onClick={(e) => {
          removeCartItem(row.original.product.productId)
          var body = document.getElementById('body')
          var curr = document.getElementById(row.original.product.productId)
          console.log(body)
          if (body && curr) {
            body.removeChild(curr)
          }
        }}
      >
        Remove
      </button>
    )
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const contact = row.original
  //     return <ContactActions contact={contact} /> // Assuming this component handles actions for the contact
  //   }
  // }
]
