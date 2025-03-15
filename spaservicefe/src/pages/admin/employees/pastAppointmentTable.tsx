import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import { getAllAppointmentByEmployeeId, getAllCommissionByEmployeeId } from './employee.util'
import { Appointment, EmployeeCommission } from '@/types/type'

interface EmployeeStatisticProps {
  employee: any
  year: number
}

export default function PastAppointmentTable({ employee, year }: EmployeeStatisticProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [commissions, setCommissions] = useState<EmployeeCommission[]>([])

  const getCommissionForAppointment = (appointment: Appointment) => {
    const requestId = appointment.request?.requestId
    const matchedCommission = commissions.find((commission) => commission.serviceTransaction?.requestId === requestId)
    return matchedCommission ? matchedCommission.commissionValue : 0
  }

  useEffect(() => {
    const fetchData = async () => {
      const appointmentData = await getAllAppointmentByEmployeeId(employee.employeeId)
      setAppointments(appointmentData)
      const commissionData = await getAllCommissionByEmployeeId(employee.employeeId)
      setCommissions(commissionData)
    }
    fetchData()
  }, [employee])
  
  return (
    <Card className='-mt-5 rounded-none border-white bg-transparent shadow-none'>
      <CardHeader className='text-lg'>
        <CardTitle>Past Appointments</CardTitle>
      </CardHeader>
      <CardContent className='overflow-x-auto'>
        {appointments.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full table-auto text-left'>
              <thead className='border-b'>
                <tr>
                  <th className='px-4 py-2'>Service</th>
                  <th className='px-4 py-2'>Customer</th>
                  <th className='px-4 py-2'>Date</th>
                  <th className='px-4 py-2'>Note</th>
                  <th className='px-4 py-2'>Commission</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.appointmentId} className='border-b'>
                    <td className='px-4 py-2'>{appointment.request?.service?.serviceName}</td>
                    <td className='px-4 py-2'>{appointment.request?.customer?.fullName}</td>
                    <td className='px-4 py-2'>
                      {new Date(appointment.startTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour12: false
                      })}
                    </td>
                    <td className='px-4 py-2'>{appointment.request?.managerNote || 'N/A'}</td>
                    <td className='px-4 py-2'>
                      {getCommissionForAppointment(appointment) !== 0
                        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            getCommissionForAppointment(appointment)
                          )
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='flex items-center justify-center'>No appointments found.</p>
        )}
      </CardContent>
    </Card>
  )
}
