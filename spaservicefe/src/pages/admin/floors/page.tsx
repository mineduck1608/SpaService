import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Floor } from '@/types/type' // Replace News with Floor type
import { getAllFloors, getFloorCategoryName } from './floor.util'

export default function AdminFloorPage() {
  const [data, setData] = useState<Floor[]>([]) // Change to Floor type
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const floors = await getAllFloors() // Fetch floor data

        setData(floors)
      } catch (err) {
        setError("Can't load the data.")
      } finally {
        setLoading(false)
      }
    }
    if (data.length === 0) {
      fetchData()
    }
  }, [])

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Floor Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
