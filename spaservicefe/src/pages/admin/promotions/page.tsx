import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Promotion } from '@/types/type' // Kiểu dữ liệu Employee
import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày
import { getAllPromotions } from './promotion.util'

export default function PromotionPage() {
  const [data, setData] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promotions = await getAllPromotions()
        console.log('Fetched promotions:', promotions)
        setData(promotions)
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
      <h2 className='container mx-auto my-4 ml-11'>Promotion Management</h2> {/* Đổi thành Employee Management */}
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
