import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Order } from 'src/types/type'
import { getOrders } from './order.util'

export default function OrderTable() {
  const [data, setData] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = sessionStorage.getItem('customerId')
        const orders = await getOrders(customerId? customerId : '')
        setData(orders)
      } catch (err) {
        setError("Can't load the data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='container mx-auto w-[96%] rounded-md border bg-slate-50'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
