import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Order } from '@/types/type' // Import Customer type to handle customer data
import { getAllOrders } from '../orders/order.util' // Fetch orders
import { getAllCustomers } from '../customers/customer.util' // Fetch customers by customerId
import { format } from 'date-fns' // Use date-fns to format dates

export default function OrderPage() {
  const [data, setData] = useState<Order[]>([]) // State to store orders
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders and customers concurrently
        const [orders, allCustomers] = await Promise.all([getAllOrders(), getAllCustomers()])

        // Map customers by their customerId for easy lookup
        const customerMap = allCustomers.reduce(
          (acc, customer) => {
            acc[customer.customerId] = {
              fullName: customer.fullName,
              phone: customer.phone // Add phone number to the map
            }
            return acc
          },
          {} as Record<string, { fullName: string; phone: string }>
        )

        // Format orders and replace customerId with customer fullName and phone
        const formattedOrders = orders.map((order) => ({
          ...order,
          orderDate: format(new Date(order.orderDate), 'dd/MM/yyyy'), // Format date
          name: customerMap[order.customerId]?.fullName || 'Unknown', // Replace customerId with fullName
          phone: customerMap[order.customerId]?.phone || 'Unknown', // Add phone number
          status: order.status ? 'Processed' : 'Unprocessed' // Convert status to text
        }))

        // Set the formatted orders data
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
