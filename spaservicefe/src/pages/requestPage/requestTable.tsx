import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { SpaRequest } from '../../types/type' // Updated to CustomerRequest type

import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày
import { getRequestsOfAccId } from './requestPage.util'
import { jwtDecode } from 'jwt-decode'
import { getToken } from '../../types/constants'
import { PastBookingContext } from './context/pastBookingContext'

export default function RequestTable() {
  const [data, setData] = useState<SpaRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pastBooking, setPastBooking] = useState(false)

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
    <div className='container mx-auto w-[96%] rounded-md border bg-slate-50'>
      <PastBookingContext.Provider value={{ pastBooking, setPastBooking }}>
        <DataTable
          columns={columns}
          data={data.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())}
        />
      </PastBookingContext.Provider>
    </div>
  )
}
