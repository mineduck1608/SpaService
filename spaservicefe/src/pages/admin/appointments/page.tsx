import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { getToken } from '../../../types/constants'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'

//Định nghĩa kiểu dữ liệu cho sự kiện
interface Event {
  id: number
  title: string
  start: string
  end: string
}


function formatNoSecond(d: string): string{
  if (!d || typeof d !== "string") {
    console.error("Invalid date format:", d)
    return "Invalid Date"
  }

  const parts = d.split('T')
  if (parts.length !== 2) {
    console.error("Unexpected date format:", d)
    return "Invalid Date"
  }

  const date = parts[0]
  const time = parts[1].substring(0, 5)

    return `${date} ${time}`
}

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const [events, setEvents] = useState<Event[]>([])
 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://localhost:7205/api/appointments/GetAll', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })

        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }

        const data: {status: string; startTime: string; endTime: string}[] = await response.json()
        console.log('Fetched events:', data)
        
        // Giả sử API trả về danh sách sự kiện có trường start và end dạng ISO
        const formattedEvents = data.map((event, index) => ({
          id: index + 1,
          title: event.status,
          start: formatNoSecond(event.startTime),
          end: formatNoSecond(event.endTime),
        }))

        console.log('Formatted events:', formattedEvents)


        setEvents(formattedEvents)
        localStorage.setItem('events', JSON.stringify(formattedEvents))
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
      fetchEvents()
  }, [])

  useEffect(() => {
    console.log("Fetched Events:", events)
  }, [events])
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventsService]
  })
 
  return (
    <div style={{ minHeight: "500px"}}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default CalendarApp
