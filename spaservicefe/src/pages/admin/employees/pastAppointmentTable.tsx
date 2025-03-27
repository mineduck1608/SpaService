import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card'
import { getAllAppointmentByEmployeeId, getAllCommissionByEmployeeId } from './employee.util'
import { Appointment, EmployeeCommission, SpaRequest } from '@/types/type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'src/components/ui/table'
import { getRequestById } from '../customerRequests/customerRequest.util'

interface EmployeeStatisticProps {
  employee: any
  year: number
}

export default function PastAppointmentTable({ employee, year }: EmployeeStatisticProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [commissions, setCommissions] = useState<Map<number, number>>(new Map())

  useEffect(() => {
    const fetchData = async () => {
      const appointmentData = await getAllAppointmentByEmployeeId(employee.employeeId)
      const commissionData = await getAllCommissionByEmployeeId(employee.employeeId)

      const filteredAppointments = appointmentData.filter((appointment) => {
        const appointmentYear = new Date(appointment.startTime).getFullYear()
        return appointmentYear === year
      })

      setAppointments(filteredAppointments)

      const commissionMap = new Map<number, number>()
      for (const appointment of filteredAppointments) {
        const request = await getRequestById(appointment.requestId)
        const matchedCommission = commissionData.find((commission) => commission.serviceTransaction?.requestId === request.requestId)
        if (matchedCommission) {
          commissionMap.set(appointment.appointmentId, matchedCommission.commissionValue)
        } else {
          commissionMap.set(appointment.appointmentId, 0)
        }
      }
      setAppointments(filteredAppointments)
      setCommissions(commissionMap)
    }

    fetchData()
  }, [employee, year])

  return (
    <Card className='-mt-5 rounded-none border-white bg-transparent shadow-none'>
      <CardHeader className='text-lg'>
        <CardTitle>Past Appointments</CardTitle>
      </CardHeader>
      <CardContent className='overflow-x-auto'>
        {appointments.length > 0 ? (
          <div className='overflow-x-auto'>
            <Table className='-mt-2 mb-5'>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center'>No</TableHead>
                  <TableHead className='text-center'>Service</TableHead>
                  <TableHead className='text-center'>Customer</TableHead>
                  <TableHead className='text-center'>Date</TableHead>
                  <TableHead className='text-center'>Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment, index) => (
                  <TableRow key={appointment.appointmentId}>
                    <TableCell className='text-center'>{index + 1}</TableCell>
                    <TableCell className='text-center'>{appointment.serviceName}</TableCell>
                    <TableCell className='text-center'>{appointment.customerName}</TableCell>
                    <TableCell className='text-center'>
                      {new Date(appointment.startTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour12: false
                      })}
                    </TableCell>
                    <TableCell className='text-center'>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(commissions.get(appointment.appointmentId) || 0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className='flex items-center justify-center'>No appointments found.</p>
        )}
      </CardContent>
    </Card>
  )
}