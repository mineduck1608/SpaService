import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Appointment, SpaRequest } from '../../types/type' // Updated to CustomerRequest type
import { jwtDecode } from 'jwt-decode'
import { getToken } from '../../types/constants'
import { SelectedContext } from './context/selectedContext'
import { SessionItem } from '@/types/sessionItem'
import { getCart } from '../cosmeticDetailPage/detailPage.util'

export default function CartTable() {

  return (
    <div className='container mx-auto w-[100%] rounded-md border bg-slate-50'>
      <DataTable columns={columns} data={getCart()} />
    </div>
  )
}
