import { Checkbox } from '../../components/ui/checkbox'
import { SessionItem } from '@/types/sessionItem'
import { Row, Table } from '@tanstack/react-table'
import React, { useContext, useRef, useState } from 'react'
import { getCartItem, removeCartItem, setCart, setCartItem } from '../cosmeticDetailPage/detailPage.util'
import { SessionContext } from './context/selectedContext'

export default function RowCheckBox(params: { row: Row<SessionItem> }) {
  const context = useContext(SessionContext)
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
          setCart(x)
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
            context.items.forEach((v) => (v.included = value))
            setCart(v)
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
  const context = useContext(SessionContext)
  const productId = params.row.original.product.productId
  return (
    <button
      className='rounded-sm bg-purple1 p-2 text-white'
      onClick={async (e) => {
        const x = context.items.filter((x) => x.product.productId !== productId)
        context.setItems(x)
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
  const inputRef = useRef<HTMLInputElement>(null)
  inputRef?.current?.addEventListener('blur', (e) => {
    
  })
  return (
    <input
      ref={inputRef}
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
        context.setItems(x)
        setCart(x)
        setAmount(rs)
      }}
    />
  )
}
