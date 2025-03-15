import { useState, useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Appointment, EmployeeCommission } from '@/types/type'
import { getAllAppointmentByEmployee } from '../../appointments/appointments.util'
import { format } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { getToken } from 'src/types/constants'
import { getAllCommissionByEmployeeId, getEmployeeByAccountId } from '../../employees/employee.util'

export default function AppointmentManagePage() {
  const [commissions, setCommissions] = useState<EmployeeCommission[]>([])
  const [data, setData] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employee = await getEmployeeByAccountId(jwtDecode(getToken() ?? '').UserId)
        const appointments = await getAllAppointmentByEmployee(employee.employeeId)

        const formattedAppointments = await Promise.all(
          appointments.map(async (appointment: Appointment) => {
            return {
              ...appointment,
              appointmentId: appointment.appointmentId,
              customerName: appointment.request?.customer?.fullName,
              serviceName: appointment.request?.service?.serviceName,
              roomNumber: appointment.room?.roomNum,
              startTime: format(new Date(appointment.startTime), 'yyyy-MM-dd HH:mm'),
              endTime: format(new Date(appointment.endTime), 'yyyy-MM-dd HH:mm'),
              status: appointment.status,
            }
          })
        )
        setData(formattedAppointments)
      } catch (err) {
        setError("Can't load the data." + err)
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
      <h2 className='container mx-auto my-4 ml-11'>Appointments Management</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
