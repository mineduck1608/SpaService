import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { getAllAppointmentByEmployeeId } from './employee.util';
import { Appointment } from '@/types/type';

interface EmployeeStatisticProps {
  employee: any
  year: number
}

export default function PastAppointmentTable  ({ employee, year }: EmployeeStatisticProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const fetchAppointment = async () => {
      const data = await getAllAppointmentByEmployeeId(employee.employeeId)
      setAppointments(data)
    }
    fetchAppointment()
  }, [employee])

  return (
    <Card className='rounded-none border-white bg-transparent shadow-none -mt-5'>
      <CardHeader className='text-lg'>
        <CardTitle>Past Appointments</CardTitle>
      </CardHeader>
      <CardContent className='overflow-x-auto'>
        {appointments.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='table-auto w-full text-left'>
              <thead className='border-b'>
                <tr>
                  <th className='px-4 py-2'>Service</th>
                  <th className='px-4 py-2'>Start Time</th>
                  <th className='px-4 py-2'>End Time</th>
                  <th className='px-4 py-2'>Note</th>
                  <th className='px-4 py-2'>Commission</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.appointmentId} className='border-b'>
                    <td className='px-4 py-2'>{appointment.request?.service?.serviceName}</td>
                    <td className='px-4 py-2'>{new Date(appointment.startTime).toLocaleString('en-GB', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        second: '2-digit', 
                        hour12: false 
                      })}
                    </td>
                    <td className='px-4 py-2'>{new Date(appointment.endTime).toLocaleString('en-GB', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        second: '2-digit', 
                        hour12: false 
                      })}</td>
                    <td className='px-4 py-2'>{appointment.request?.managerNote || 'N/A'}</td>
                    <td className='px-4 py-2'>N/A</td>
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
