import { useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { Appointment } from '../../../types/type' // Đảm bảo đường dẫn import đúng
import { getToken } from '../../../types/constants' // Thêm import này
import '@schedule-x/theme-default/dist/index.css'

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
}

function CalendarApp() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventsService]
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://localhost:7205/api/appointments/GetAll', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        const data: Appointment[] = await response.json()
        
        console.log('Raw API data:', data)

        const formattedEvents = data.map((event: Appointment) => ({
          id: event.appointmentId,
          title: event.employee.fullName,
          start: event.startTime,
          end: event.endTime
        }))
        
        setEvents(formattedEvents); // Cập nhật state events
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp
