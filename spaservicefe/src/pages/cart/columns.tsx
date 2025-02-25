import { ColumnDef } from '@tanstack/react-table'
import { SessionItem } from '@/types/sessionItem'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { Checkbox } from '../../components/ui/checkbox'
import { getCart, getCartItem, removeCartItem, setCart, setCartItem } from '../cosmeticDetailPage/detailPage.util'

function checkAllState() {
  console.log('run')
  const cart = getCart()
  var count = 0
  cart.forEach((v) => {
    if (v.included) {
      count++
    }
  })
  if (count === 0) {
    return false
  }
  if (count === cart.length) {
    return true
  }
  return 'indeterminate'
}

export const columns: ColumnDef<SessionItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={checkAllState()}
        onCheckedChange={(value: boolean) => {
          var cart = getCart()
          cart.forEach((v) => {
            v.included = value
          })
          setCart(cart)
          table.toggleAllPageRowsSelected(value)
          checkAllState()
        }}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={getCartItem(row.original.product.productId)?.included}
        onCheckedChange={(value: boolean) => {
          var prodId = row.original.product.productId
          setCartItem(prodId, undefined, value, undefined)
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
