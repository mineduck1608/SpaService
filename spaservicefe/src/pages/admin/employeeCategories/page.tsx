import { useState, useEffect } from 'react'
import { columns } from './columns' // Adjust columns for CosmeticProduct
import { DataTable } from './data-table'
import { CategoryEmployee } from '@/types/type' // Use CosmeticProduct type instead of SpaService
import { getAllEmployeeCategory, getEmployeeById, getServiceCategoryById } from './employeeCategory.util'

export default function AdminEmployeeCategoryPage() {
  const [data, setData] = useState<CategoryEmployee[]>([]) // Use CosmeticProduct instead of SpaService
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeCategories = await getAllEmployeeCategory()
        setData(employeeCategories)
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
      <h2 className='container mx-auto my-4 ml-11'>Employee Category Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
