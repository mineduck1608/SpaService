import { CosmeticProduct } from '@/types/type'
import { Checkbox } from '../../components/ui/checkbox'
import React, { useContext, useState } from 'react'
import { SessionItem } from '@/types/sessionItem'
import { SelectedItemContext } from './context/pastAppointmentContext'

export default function RowCheck(params: { item: SessionItem, check: boolean }) {
  const context = useContext(SelectedItemContext)
  const [checked, setChecked] = useState(params.check)
  return (
    <div>
      <Checkbox
        checked={checked}
        onCheckedChange={(e) => {
          context.setSelectedItem((v) => {
            var u = [...v]
            var s = u.findIndex((x) => x.product.productId === params.item.product.productId)
            u[s].include = !checked
            return u
          })
          setChecked(!checked)
        }}
      />
    </div>
  )
}

export function CheckAll() {
  const context = useContext(SelectedItemContext)
  const [checked, setChecked] = useState(true)
  return (
    <div>
      <Checkbox
        checked={checked}
        onCheckedChange={(e) => {
          context.setSelectedItem((v) => {
            var u = [...v]
            u.forEach(x => {
              x.include = !checked
            })
            return u
          })
          setChecked(!checked)
        }}
      />
    </div>
  )
}