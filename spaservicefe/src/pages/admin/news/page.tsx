import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { News } from '@/types/type'
import { getAllNews } from './new.util'
import { getServiceCategoryById } from '../employeeCategories/employeeCategory.util'

export default function AdminNewsPage() {
  const [data, setData] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await getAllNews()

        const formattedNews = await Promise.all(
          news.map(async (item) => {
            const category = await getServiceCategoryById(item.categoryId)
            const categoryName = category ? category.categoryName : 'Unknown'
            return {
              ...item,
              categoryName,
            }
          })
        )

        setData(formattedNews)
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
      <h2 className='container mx-auto my-4 ml-11'>News Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
