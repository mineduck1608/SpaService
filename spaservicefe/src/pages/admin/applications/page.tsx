import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Application } from '@/types/type'
import { format } from 'date-fns'
import { getAllApplications } from './application.util'

export default function ApplicationPage() {
  const [data, setData] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applications = await getAllApplications()

        const formattedApplications = applications.map((application) => ({
          ...application,
          createdAt: format(new Date(application.createdAt), 'dd/MM/yyyy'),
          resolvedAt: format(new Date(application.resolvedBy), 'dd/MM/yyyy')
        }))

        setData(formattedApplications)
      } catch (err) {
        setError("Can't load the data.") // Xử lý lỗi nếu có
      } finally {
        setLoading(false) // Set loading thành false khi dữ liệu đã được tải
      }
    }
    fetchData()
  }, []) // Chạy khi component mount lần đầu

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Application Management</h2> {/* Đổi thành Employee Management */}
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
