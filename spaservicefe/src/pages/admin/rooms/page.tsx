import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Room } from '@/types/type'
import { getAllRooms, getFloorById } from './room.util'

export default function AdminRoomPage() {
  const [data, setData] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rooms = await getAllRooms()
        const formattedRooms = await Promise.all(
          rooms.map(async (room) => {
            const floor = await getFloorById(room.floorId)
            const floorName = floor ? `Floor ${floor.floorNum}` : 'Unknown'

            return {
              ...room,
              floorName
            }
          })
        )

        setData(formattedRooms)
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
      <h2 className='container mx-auto my-4 ml-11'>Room Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
