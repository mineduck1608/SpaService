import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import CartTable from './cosmeticTable'

export default function CartPage() {
  return (
    <div className='my-32'>
      <CartTable />
    </div>
  )
}