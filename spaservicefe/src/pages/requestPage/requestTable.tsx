import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Request } from '../../../types/type' // Updated to CustomerRequest type

import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày
import { getRequestsOfAccId } from './requestPage.util'
import { jwtDecode } from 'jwt-decode'
import { getToken } from '../../types/constants'

export default function CustomerRequestPage() {
  const [data, setData] = useState<Request[]>([]) // Updated to CustomerRequest
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRequests = await getRequestsOfAccId(jwtDecode(getToken() ?? '').UserId)
        setData(customerRequests)
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
    <div className='container mx-auto w-[96%] rounded-md border'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
