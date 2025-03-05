import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { SessionContext } from './context/selectedContext'
import { SessionItem } from '@/types/sessionItem'
import { getCart } from '../cosmeticDetailPage/detailPage.util'

export default function CartTable() {
  const cus = sessionStorage.getItem('customerId') ?? ''
  const [items, setItems] = useState<SessionItem[]>([])
  useEffect(() => {
    async function fetchData() {
      var s = await getCart(cus)
      if (s) {
        setItems(s)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='container mx-auto w-[100%] rounded-md border bg-slate-50'>
      <SessionContext.Provider value={{ items, setItems }}>
        <DataTable columns={columns} data={items} />
      </SessionContext.Provider>
    </div>
  )
}
