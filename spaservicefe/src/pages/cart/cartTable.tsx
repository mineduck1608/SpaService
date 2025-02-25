import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Appointment, SpaRequest } from '../../types/type' // Updated to CustomerRequest type
import { jwtDecode } from 'jwt-decode'
import { getToken } from '../../types/constants'
import { SelectedContext } from './context/selectedContext'

export default function CartTable() {
  const [data, setData] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pastBooking, setPastBooking] = useState(false)

  useEffect(() => {
  }, [])

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='container mx-auto w-[96%] rounded-md border bg-slate-50'>
      <SelectedContext.Provider value={{ pastBooking, setSelectedItem: setPastBooking }}>
        <DataTable
          columns={columns}
          data={data.filter((v) => {
            var d = new Date(v.startTime).getTime() < new Date().getTime()
            if (pastBooking) {
              return d
            }
            return !d
          })}
        />
      </SelectedContext.Provider>
    </div>
  )
}
