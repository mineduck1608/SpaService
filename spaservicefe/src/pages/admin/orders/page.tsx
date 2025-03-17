import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Order } from '@/types/type'
import { getAllOrders } from '../orders/order.util'
import { getAllCustomers } from '../customers/customer.util'
import { format } from 'date-fns'

export default function OrderPage() {
  const [data, setData] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orders, allCustomers] = await Promise.all([getAllOrders(), getAllCustomers()])

        const customerMap = allCustomers.reduce(
          (acc, customer) => {
            acc[customer.customerId] = {
              fullName: customer.fullName,
              phone: customer.phone
            }
            return acc
          },
          {} as Record<string, { fullName: string; phone: string }>
        )

        const formattedOrders = orders
          .map((order) => ({
            ...order,
            orderDateRaw: new Date(order.orderDate), // Lưu thêm giá trị Date để sắp xếp
            orderDate: format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm:ss'),
            name: customerMap[order.customerId]?.fullName || 'Unknown',
            phone: customerMap[order.customerId]?.phone || 'Unknown',
            status: order.status ? 'Processed' : 'Unprocessed'
          }))
          .sort((a, b) => b.orderDateRaw.getTime() - a.orderDateRaw.getTime()) // Sắp xếp mới nhất lên đầu

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
      <h2 className='container mx-auto my-4 ml-11'>Orders Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
