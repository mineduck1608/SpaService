import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Order } from '@/types/type'
import { getAllOrders } from '../orders/order.util'
import { format } from 'date-fns'

export default function EmployeePage() {
  const [data, setData] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getAllOrders()

        const formattedOrders = orders.map((order) => ({
          ...order,
          hireDate: format(new Date(order.orderDate), 'dd/MM/yyyy')
        }))

        setData(formattedOrders)
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
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Order Management</h2> {/* Đổi thành Employee Management */}
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
