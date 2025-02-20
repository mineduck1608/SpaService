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
function formatNoSecond(d: string){
  var x = d.split('T')
  var hm = d[1].substring(0,5)
  return `${x[0]} ${hm}`
}
function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events')
    return savedEvents ? JSON.parse(savedEvents) : []
  })
 
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
        const data = await response.json()
        console.log('Fetched events:', data)
        
        // Giả sử API trả về danh sách sự kiện có trường start và end dạng ISO
        const formattedEvents = data.map((event: { status: string; startTime: string; endTime: string }, index: number) => ({
          id: (index + 1),
          title: event.status,
          start: formatNoSecond(event.startTime), // Định dạng ISO, ví dụ: "2025-02-20T10:00:00"
          end: formatNoSecond(event.endTime), // Định dạng ISO
        }))

        console.log('Formatted events:', formattedEvents)
        setEvents(formattedEvents)
        localStorage.setItem('events', JSON.stringify(formattedEvents))
        console.log('State after update:', events)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    if(events.length === 0) {
      fetchEvents()
    }
  }, [])
 
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
