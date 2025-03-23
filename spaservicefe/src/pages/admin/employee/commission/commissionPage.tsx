import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Appointment, EmployeeCommission } from '@/types/type'
import { getAllAppointmentByEmployee } from '../../appointments/appointments.util'
import { format } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { getToken } from 'src/types/constants'
import { getEmployeeByAccountId } from '../../employees/employee.util'
import { getCommissionByEmployeeId } from './commission.util'
import Overall from './overall'

export default function CommissionPage() {
  const [data, setData] = useState<EmployeeCommission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value))
  }

  useEffect(() => {
    setData([])
    setLoading(true)
    const fetchData = async () => {
      try {
        const employee = await getEmployeeByAccountId(jwtDecode(getToken() ?? '').UserId)
        const [appointmentData, commissionData] = await Promise.all([
          getAllAppointmentByEmployee(employee.employeeId),
          getCommissionByEmployeeId(employee.employeeId)
        ])

        const commissionMap = new Map(
          commissionData.map((commission) => [commission.serviceTransaction?.requestId, commission])
        )

        const formattedCommission = appointmentData.map((appointment: Appointment) => {
          const commission = commissionMap.get(appointment.request?.requestId)
          return {
            ...appointment,
            customerName: appointment.request?.customer?.fullName,
            serviceName: appointment.request?.service?.serviceName,
            date: format(new Date(appointment.startTime), 'yyyy-MM-dd'),
            status: appointment.status,
            transactionId: commission?.serviceTransaction?.transactionId,
            commissionValue: commission?.commissionValue || 0
          }
        })

        const filteredData = formattedCommission.filter((item) => new Date(item.date).getFullYear() === selectedYear)
        setData(filteredData)
      } catch (err) {
        setError("Can't load the data." + err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedYear])

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Employee Commission</h2>
      <div className='z-100 container mx-auto mb-4 flex w-[96%] cursor-pointer justify-end'>
        <select value={selectedYear} onChange={handleChange} className='cursor-pointer rounded border p-2'>
          {Array.from({ length: 3 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>
      <div className='container mx-auto h-[250px]'>
        <Overall year={selectedYear} data={data} />
      </div>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
