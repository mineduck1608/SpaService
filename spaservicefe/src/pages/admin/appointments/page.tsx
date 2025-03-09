import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay, createViewMonthAgenda, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import { fetchAppointments, fetchEmployees } from './appointments.util'
import { createEventModalPlugin } from '@schedule-x/event-modal'

function CalendarApp() {
  const [events, setEvents] = useState(() => {
    const savedEvents = sessionStorage.getItem('events')
    return savedEvents ? JSON.parse(savedEvents) : []
  })

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchAppointments()
      console.log('Fetched events:', fetchedEvents)
      setEvents(fetchedEvents)
      sessionStorage.setItem('events', JSON.stringify(fetchedEvents))
    }

    const loadEmployees = async () => {
      const fetchedEmployees = await fetchEmployees()
    }

    loadEvents()
    loadEmployees()
  }, [])

  const eventModal = createEventModalPlugin()

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventModal],
  })

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div style={{ minHeight: '500px' }}>
      <button onClick={handleReload} style={{ marginBottom: '10px', padding: '8px 16px', cursor: 'pointer' }}>
        Show appointments
      </button>

        <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp
