import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Request } from '../../../types/type' // Updated to CustomerRequest type
import { getAllCustomerRequests } from '../customerRequests/customerRequest.util' // Assuming the new function to get customer requests
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày

export default function CustomerRequestPage() {
  const [data, setData] = useState<Request[]>([]) // Updated to CustomerRequest
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRequests = await getAllCustomerRequests()


        const formattedCustomerRequests = customerRequests.map((request) => ({
          ...request,
          startTime: format(new Date(request.startTime), 'dd/MM/yyyy HH:mm:ss'), // Format start time
          customerNote: request.customerNote || 'No notes provided', // Default note if none provided
          managerNote: request.managerNote || 'No notes provided', // Default manager note if none provided
        }))

        setData(formattedCustomerRequests)
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
      <h2 className='container mx-auto my-4 ml-11'>Customer Requests Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
