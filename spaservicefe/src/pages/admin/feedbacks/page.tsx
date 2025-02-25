import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Feedback } from '@/types/type' // Replace News with Floor type
import { getAllFeedbacks, getCustomerById, getSpaServiceById } from './feedback.util'
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày


export default function AdminFeedbackPage() {
  const [data, setData] = useState<Feedback[]>([]) // Change to Floor type
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbacks = await getAllFeedbacks() // Fetch floor data
        // Lấy tên danh mục cho từng floor
        const formattedFeedbacks = await Promise.all(
          feedbacks.map(async (feedback) => {
            const service = await getSpaServiceById(feedback.serviceId) // Fetch category for floor
            const customer = await getCustomerById(feedback.createdBy) // Fetch category for floor

            const customerName = customer ? customer.fullName : 'Unknown'
            const serviceName = service ? service.serviceName : 'Unknown' // Set default category name
            return {
              ...feedback,
              serviceName, // Add category name to floor data
              customerName ,
              createdAt: format(new Date(feedback.createdAt), 'dd/MM/yyyy HH:mm:ss')
            }
          })
        )

        setData(formattedFeedbacks)
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
      <h2 className='container mx-auto my-4 ml-11'>Feedbacks Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
