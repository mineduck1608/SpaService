import { Checkbox } from '../../components/ui/checkbox'
import { SessionItem } from '@/types/sessionItem'
import { Row, Table } from '@tanstack/react-table'
import React, { useContext, useState } from 'react'
import { removeCartItem, setCart } from '../cosmeticDetailPage/detailPage.util'
import { SessionContext } from './context/selectedContext'

export default function RowCheckBox(params: { row: Row<SessionItem> }) {
  const context = useContext(SessionContext)
  const customerId = sessionStorage.getItem('customerId') ?? ''
  const entry = context.items.findIndex((x) => x.product.productId === params.row.original.product.productId)
  const [state, setState] = useState(context.items[entry].included)
  return (
    <div>
      <Checkbox
        checked={context.items[entry].included}
        onCheckedChange={(value: boolean) => {
          const x = [...context.items]
          x.map((c, i) => {
            if (i === entry) {
              c.included = value
            }
            return c
          })
          context.setItems(x)
          setCart(customerId, params.row.original)
          params.row.toggleSelected(value)
          setState(value)
        }}
        aria-label='Select row'
      />
    </div>
  )
}

export function AllRowCheckBox(params: { table: Table<SessionItem> }) {
  const context = useContext(SessionContext)
  const customerId = sessionStorage.getItem('customerId') ?? ''
  function checkAllState() {
    var count = 0
    context.items.forEach((v) => {
      if (v.included) {
        count++
      }
    })
    if (count === 0) {
      return false
    }
    if (count === context.items.length) {
      return true
    }
    return 'indeterminate'
  }
  const check = checkAllState()

  return (
    <div>
      <Checkbox
        checked={check}
        onCheckedChange={(value: boolean) => {
          context.setItems((v) => {
            context.items.forEach((v) => {
              v.included = value
              setCart(customerId, v)
            })
            return v
          })
          params.table.toggleAllRowsSelected(value)
        }}
        aria-label='Select row'
      />
    </div>
  )
}
export function RemoveButton(params: { row: Row<SessionItem> }) {
  const productId = params.row.original.product.productId
  return (
    <button
      className='rounded-sm bg-purple1 p-2 text-white'
      onClick={async (e) => {
        var v = document.getElementById(productId)
        if (v) {
          document.getElementById('body')?.removeChild(v)
        }
        await removeCartItem(params.row.original.id ?? '')
      }}
    >
      Remove
    </button>
  )
}

export function AmountButton(params: { row: Row<SessionItem> }) {
  const context = useContext(SessionContext)
  const item = params.row.original
  const entry = context.items.findIndex((x) => x.product.productId === params.row.original.product.productId)
  const [amount, setAmount] = useState(item.amount)
  const customerId = sessionStorage.getItem('customerId') ?? ''
  return (
    <input
      className='border-[1px] p-1'
      type='number'
      value={amount}
      onChange={(e) => {
        var s = e.target.value
        if (s.length === 0) {
          return
        }
        var rs = parseInt(s)
        if (rs <= 0) {
          return
        }
        const x = [...context.items]
        x.map((c, i) => {
          if (i === entry) {
            c.amount = rs
          }
          return c
        })
        setCart(customerId, params.row.original)
        context.setItems(x)
        setAmount(rs)
      }}
    />
  )
}
