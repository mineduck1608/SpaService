import { useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { getAllAppointments } from './appointments.util'
import { Appointment } from '../../../types/type'

import '@schedule-x/theme-default/dist/index.css'

function CalendarApp() {
  const [events, setEvents] = useState<{id: string, title: string, start: string, end: string}[]>([])
  const eventsService = createEventsServicePlugin()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await getAllAppointments()
        const formattedEvents = appointments.map((appointment: Appointment) => ({
          id: appointment.appointmentId,
          title: appointment.employee.fullName,
          start: appointment.startTime,
          end: appointment.endTime,
        }))
        setEvents(formattedEvents)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchAppointments()
  }, [])

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events,
    plugins: [eventsService]
  })

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp
