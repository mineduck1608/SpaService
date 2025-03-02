import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Appointment, SpaRequest } from '../../types/type' // Updated to CustomerRequest type

import { format } from 'date-fns' // Dùng thư viện date-fns để format ngày
import { getAppointments } from './appointmentPage.util'
import { jwtDecode } from 'jwt-decode'
import { getToken } from '../../types/constants'
import { PastAppointmentContext } from './context/pastAppointmentContext'

export default function AppointmentTable() {
  const [data, setData] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pastBooking, setPastBooking] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await getAppointments(jwtDecode(getToken() ?? '').UserId)
        setData(appointments)
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
  const pastAppointment = (v: Appointment) => {
    var d = new Date(v.startTime).getTime() < new Date().getTime()
    if (pastBooking) {
      return d
    }
    return !d
  }
  return (
    <div className='container mx-auto w-[96%] rounded-md border bg-slate-50'>
      <PastAppointmentContext.Provider value={{ pastBooking, setPastBooking }}>
        <DataTable
          columns={columns}
          data={data
            .filter(pastAppointment)
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())}
        />
      </PastAppointmentContext.Provider>
    </div>
  )
}
